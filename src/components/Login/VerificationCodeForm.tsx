import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Routes } from "types";
import { createUserSuccess } from "store/actions";
import { GetUserByPhoneNumber, UpdateUser } from "lib/endpoints";
import useUser from "lib/useUser";
import { debug, debugError } from "helpers/debug";
import { verificationErrors } from "helpers/errorMessages";
import {
  getEmulatorVerificationCode,
  loginOrRegisterBypassingFirebase,
  shouldBypassFirebaseOnDevelopment
} from "helpers/firebase";
import { verificationCodeSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  setErrorMessage: (m: string) => void;
  setVerificationCodeSent: (f: boolean) => void;
  userPhoneNumber: string;
};

const VerificationCodeForm = ({
  setErrorMessage,
  setVerificationCodeSent,
  userPhoneNumber
}: Props): ReactElement => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [firebaseIdToken, setFirebaseIdToken] = useState("");
  const [emulatorCode, setEmulatorCode] = useState("");

  const dispatchToStore = useDispatch();

  const { mutateUser } = useUser();
  const { login, logout } = useAuth();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          firebaseUser.getIdToken().then((idToken) => {
            setFirebaseIdToken(idToken);
          });
        }
      });
    return () => unregisterAuthObserver(); // un-register observers on unmounts.
  });

  const addUserToSessionStorage = (firebaseUser) => {
    try {
      firebaseUser.getIdToken().then(async (idToken) => {
        const userSession = await UpdateUser({
          details: {
            id: undefined,
            phoneNumber: firebaseUser?.phoneNumber,
            createdAt: firebaseUser.metadata.creationTime
          },
          firebase: {
            id: firebaseUser?.uid,
            token: idToken
          },
          isLoggedIn: false
        });
        await mutateUser(userSession, true);
      });
    } catch (error) {
      debugError("UpdateUser", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      verificationCode: emulatorCode
    },
    initialTouched: {
      verificationCode: !!emulatorCode
    },
    enableReinitialize: true,
    validationSchema: verificationCodeSchema,
    onSubmit: async (values) => {
      setLoading(true);

      // 2/3 step in bypassing firebase
      if (shouldBypassFirebaseOnDevelopment) {
        await loginOrRegisterBypassingFirebase(
          userPhoneNumber,
          login,
          firebaseIdToken,
          setLoading,
          dispatchToStore,
          createUserSuccess,
          router
        );
      }
      (window as any).confirmationResult
        .confirm(values.verificationCode)
        .then(async (response) => {
          const { user: firebaseUser, additionalUserInfo } = response;
          debug(`confirmationResult: response`, response);

          let userData;
          try {
            userData = await GetUserByPhoneNumber(firebaseUser.phoneNumber);
          } catch (error) {
            if (additionalUserInfo?.isNewUser || !userData) {
              debug("No user exists with that phonenumber");
              if (!userData && !additionalUserInfo?.isNewUser) {
                debug(
                  `Deleting firebase user. No user found with phonenumber ${firebaseUser.phoneNumber}: ${error}`
                );
                firebaseUser.delete(); // maybe not needed?
              }
              addUserToSessionStorage(firebaseUser);
              router.push(Routes.Register);
            }
          }

          if (userData?.phoneNumber && userData?.userName) {
            // user exists, log him/her in
            debug("Will login existing user");
            try {
              firebaseUser.getIdToken().then(async (idToken) => {
                await login(userData, idToken);
              });
              router.push(Routes.Profile);
            } catch (error) {
              setLoading(false);
              setErrorMessage(error.message);
            }
          }
        })
        .catch((error) => {
          setLoading(false);

          logout();

          if (error.code === "auth/code-expired") {
            setErrorMessage(verificationErrors.SMS_EXPIRED);
            setVerificationCodeSent(false);
          }
          setErrorMessage("Óvænt villa kom, reyndu að staðfesta aftur.");
          debugError("Verification code failure", error);
        });
    }
  });

  useEffect(() => {
    async function fetchEmulatorCode() {
      const code = await getEmulatorVerificationCode(userPhoneNumber);
      setEmulatorCode(code);
      formik.setFieldValue("verificationCode", code, true);
      formik.setFieldTouched("verificationCode", true, true);
    }

    if (process.env.FIREBASE_EMULATOR !== "0" && process.env.CYPRESS !== "1") {
      fetchEmulatorCode();
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h1>Staðfestingarkóði hefur verið sendur í símann þinn</h1>
      <MUIInput
        type="text"
        id="verificationCode"
        name="verificationCode"
        placeholder="Staðfestingarkóði"
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched("verificationCode", true, true)}
        value={formik.values.verificationCode}
        error={formik.errors.verificationCode}
        isTouched={formik.touched.verificationCode}
        inputProps={{
          "data-test": "verificationCodeLoginInput"
        }}
        controlValue={emulatorCode}
      />
      <Button
        name="VerificationCode"
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Staðfesta kóða
      </Button>
    </form>
  );
};
export default VerificationCodeForm;
