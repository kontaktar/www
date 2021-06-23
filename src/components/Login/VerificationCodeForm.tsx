import React, { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Routes, SessionStorage } from "types";
import { createUserSuccess } from "store/actions";
import { CreateUser, GetUserByPhoneNumber } from "lib/endpoints";
import { debug, debugError, debugError, debugWarn } from "helpers/debug";
import { verificationErrors } from "helpers/errorMessages";
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
  const dispatchToStore = useDispatch();

  const { login } = useAuth();
  const { connectFirebaseUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      verificationCode: ""
    },
    validationSchema: verificationCodeSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_BYPASS_FIREBASE === "1"
      ) {
        // 2/3 step in bypassing firebase on localhost
        let userData;
        try {
          userData = await GetUserByPhoneNumber(userPhoneNumber);
        } catch (error) {
          setLoading(false);
          debugError(error);
        }
        if (userData) {
          await login(userData);
        } else {
          const mockFirebaseId = uuid();
          const { userId } = await CreateUser({
            phoneNumber: userPhoneNumber,
            createdAt: new Date()
          });
          if (userId) {
            window.sessionStorage.setItem(SessionStorage.UserId, userId);
            dispatchToStore(
              createUserSuccess(userId, { phoneNumber: userPhoneNumber })
            );
            connectFirebaseUser(userId, userPhoneNumber, mockFirebaseId);
            router.push("/nyskra");
          }
        }
        return;
      }
      // TODO: clean this up
      setLoading(true);
      (window as any).confirmationResult
        .confirm(values.verificationCode)
        .then(async (response) => {
          // TODO: DO STUFF HERE TO SIGN IN USER
          console.log("response", response);
          const { user, additionalUserInfo } = response;
          console.log("additionalUserInfo", additionalUserInfo);

          if (additionalUserInfo?.isNewUser) {
            try {
              const { userId } = await CreateUser({
                phoneNumber: user.phoneNumber,
                createdAt: user.metadata.creationTime
              });
              debug(`CreateUser: ${userId}`);
              window.sessionStorage.setItem(SessionStorage.UserId, userId);
              dispatchToStore(
                createUserSuccess(userId, { phoneNumber: user?.phoneNumber })
              );
              connectFirebaseUser(userId, user?.phoneNumber, user?.uid);
              router.push("/nyskra");
            } catch (error) {
              setLoading(false);
              if (error?.includes("duplicate")) {
                setErrorMessage("Það er til notandi með þetta símanúmer");
              }
              setErrorMessage(error.message);
              debugError(`Create New User: ${error}`);
            }
            // TODO: make sure in nyskra to check for firebase user
          } else {
            let userData;
            try {
              userData = await GetUserByPhoneNumber(user.phoneNumber);
            } catch (error) {
              setLoading(false);
              setErrorMessage("Enginn notandi með þetta símanúmer");

              // delete the firebase user because it's not connected to a user.
              user.delete();

              debug(
                `Deleting firebase user. No user found with phonenumber ${user.phoneNumber}: ${error}`
              );
            }
            if (userData?.userName) {
              // user exists, log him/her in
              try {
                await login(userData);
                router.push(Routes.Profile);
              } catch (error) {
                setLoading(false);
                setErrorMessage(error.message);
              }
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === "auth/code-expired") {
            setErrorMessage(verificationErrors.SMS_EXPIRED);
            setVerificationCodeSent(false);
          }
          setErrorMessage(error.message);
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
      <Button type="submit" isLoading={isLoading}>
        Staðfesta kóða
      </Button>
    </form>
  );
};
export default VerificationCodeForm;
