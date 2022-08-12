import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuth as useFirebaseAuth } from "providers/FirebaseAuthUser";
import { useLoginForm } from "providers/LoginForm";
import { useRouter } from "next/router";
import { Routes } from "types";
import { GetUserByPhoneNumber } from "lib/endpoints";
import { debug, debugError } from "helpers/debug";
import { verificationErrors } from "helpers/errorMessages";
import { isBypassingFirebase } from "helpers/firebase";
import { getEmulatorVerificationCode } from "helpers/firebase";
import { verificationCodeSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import { Button } from "components";
import { MUIInput } from "components/Input";
import { mapDatabaseUser } from "../../utils/session";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  userPhoneNumber: string;
};

const VerificationCodeForm = ({ userPhoneNumber }: Props): ReactElement => {
  const router = useRouter();
  const { isVerificationCodeSent, setVerificationCodeSent, setErrorMessage } =
    useLoginForm();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { firebaseIdToken, verificationCodeSent, emulatorCode } =
    useFirebaseAuth();
  const { login, logout, mutateUser, preregister } = useAuth();

  const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email,
    phoneNumber: user.phoneNumber
  });

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

      // TODO: CLEAN THIS UP
      try {
        (window as any).confirmationResult
          .confirm(values.verificationCode) // TO FIREBASE PROVIDER
          .then(async (response) => {
            const { user: firebaseUser, additionalUserInfo } = response;
            debug(`confirmationResult: response`, response);

            // try getting user by phone number
            let userData;
            try {
              userData = await mapDatabaseUser(
                await GetUserByPhoneNumber(firebaseUser.phoneNumber)
              );
            } catch (error) {
              debugError("GetUserByPhoneNumber ERROR", error);
              router.push(Routes.Login);
            } finally {
              if (additionalUserInfo.isNewUser || !userData) {
                debug("No user exists with that phonenumber", userData);
                debug(
                  "No user exists with that phonenumber :additionalUserInfo?.isNewUser",
                  additionalUserInfo?.isNewUser
                );
                if (!userData && !additionalUserInfo.isNewUser) {
                  debug(
                    `DELETING FIREBASE USER. No user found with phonenumber ${firebaseUser.phoneNumber}`
                  );
                  firebaseUser.delete(); // maybe not needed?
                }
                firebaseUser.getIdToken().then(async (idToken) => {
                  await preregister(formatAuthUser(firebaseUser), idToken);
                });

                setLoading(true);
              }
            }
            if (userData && userData?.phoneNumber && userData?.userName) {
              // user exists, log him/her in
              debug("Will login existing user");
              try {
                setLoading(true);
                await login(userData);
              } catch (error) {
                setLoading(false);
                setErrorMessage(error.message);
              }
            }
          })
          .catch((error) => {
            setLoading(false);

            logout();

            if (error?.code === "auth/code-expired") {
              setErrorMessage(verificationErrors.SMS_EXPIRED);
              setVerificationCodeSent(false);
              return;
            }
            setErrorMessage("Óvænt villa kom, reyndu að staðfesta aftur.");
            debugError("Verification code failure", error);
          });
      } catch (err) {
        console.error("Verification error:", err);
      }
    }
  });

  useEffect(() => {
    async function fetchEmulatorCode() {
      formik.setFieldValue("verificationCode", emulatorCode, true);
      formik.setFieldTouched("verificationCode", true, true);
    }

    if (isBypassingFirebase && !emulatorCode) {
      fetchEmulatorCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPhoneNumber, verificationCodeSent, emulatorCode]);

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
        autoComplete="one-time-code"
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
