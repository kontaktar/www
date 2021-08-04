import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Routes, SessionStorage } from "types";
import { createUserSuccess } from "store/actions";
import { CreateUser, GetUserByPhoneNumber, UpdateUser } from "lib/endpoints";
import useUser from "lib/useUser";
import { debug, debugError } from "helpers/debug";
import { verificationErrors } from "helpers/errorMessages";
import {
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

  const dispatchToStore = useDispatch();

  const { mutateUser } = useUser();
  const { login } = useAuth();

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

  const formik = useFormik({
    initialValues: {
      verificationCode: ""
    },
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
          const { user, additionalUserInfo } = response;

          debug(`confirmationResult: response`, response);

          if (additionalUserInfo?.isNewUser) {
            try {
              const { userId } = await CreateUser({
                phoneNumber: user.phoneNumber,
                createdAt: user.metadata.creationTime,
                firebaseId: user?.uid
              });

              await mutateUser(
                {
                  details: {
                    id: userId,
                    createdAt: user.metadata.creationTime,
                    phoneNumber: user.phoneNumber
                  },
                  firebase: {
                    id: user?.uid
                  },
                  isLoggedIn: false
                },
                true
              );

              debug(`VerificationCodeForm:CreateUser: ${userId}`);

              window.sessionStorage.setItem(SessionStorage.UserId, userId);
              dispatchToStore(
                createUserSuccess(userId, { phoneNumber: user?.phoneNumber })
              );

              router.push(Routes.Register);
            } catch (error) {
              setLoading(false);
              if (error?.includes("duplicate")) {
                setErrorMessage("Það er til notandi með þetta símanúmer");
              }
              setErrorMessage(error.message);
              debugError(`Create New User: ${error}`);
            }
          } else {
            let userData;
            try {
              userData = await GetUserByPhoneNumber(user.phoneNumber);
            } catch (error) {
              setLoading(false);
              setErrorMessage(
                "Enginn notandi með þetta símanúmer.Vinsamlegast reyndu aftur"
              );
              // delete the firebase user because it's not connected to a user.
              user.delete();

              debug(
                `Deleting firebase user. No user found with phonenumber ${user.phoneNumber}: ${error}`
              );
            }
            if (userData?.phoneNumber && userData?.userName) {
              // user exists, log him/her in
              debug("Will login existing user");
              try {
                user.getIdToken().then(async (idToken) => {
                  await login(userData, idToken);
                });
                router.push(Routes.Profile);
              } catch (error) {
                setLoading(false);
                setErrorMessage(error.message);
              }
            }
            if (userData?.phoneNumber && !userData?.userName) {
              // somehow user started the registration but never finished.
              window.sessionStorage.setItem(
                SessionStorage.UserId,
                userData?.id
              );
              const userSession = await UpdateUser({
                details: {
                  id: userData?.id,
                  phoneNumber: userData?.phoneNumber
                },
                firebase: {
                  id: user?.uid,
                  token: firebaseIdToken
                },
                isLoggedIn: false
              });

              await mutateUser(userSession, true);
              router.push(Routes.Register);
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === "auth/code-expired") {
            setErrorMessage(verificationErrors.SMS_EXPIRED);
            setVerificationCodeSent(false);
          }
          setErrorMessage("Óvænt villa kom, reyndu að staðfesta aftur.");
          debugError(`Verification code failure: ${error}`);
        });
    }
  });

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
      />
      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        Staðfesta kóða
      </Button>
    </form>
  );
};
export default VerificationCodeForm;
