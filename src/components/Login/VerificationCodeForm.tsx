import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { verificationCodeSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import { GetUserByPhoneNumber } from "pages/api/endpoints";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  setErrorMessage: (m: string) => void;
};

const VerificationCodeForm = ({ setErrorMessage }: Props): ReactElement => {
  const router = useRouter();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      verificationCode: ""
    },
    validationSchema: verificationCodeSchema,
    onSubmit: async (values) => {
      (window as any).confirmationResult
        .confirm(formik.values.verificationCode)
        .then(async (response) => {
          // TODO: DO STUFF HERE TO SIGN IN USER
          console.log("response", response);
          console.log("response.user", response.user);
          console.log(
            "response.user.metadata.creationTime",
            response.user.metadata.creationTime
          );
          console.log(
            "response.user.metadata.lastSignInTime",
            response.user.metadata.lastSignInTime
          );
          console.log("response.user.uid", response.user.uid);
          console.log("isNewUser", response?.additionalUserInfo?.isNewUser);
          console.log("additionalUserInfo", response?.additionalUserInfo);

          if (response?.additionalUserInfo?.isNewUser) {
            router.push("/nyskra");
            // TODO: make sure in nyskra to check for firebase user
          } else {
            let user;
            try {
              user = await GetUserByPhoneNumber(response.user.phoneNumber);
            } catch (error) {
              setErrorMessage(error.message);
              console.log(
                `No user found with phonenumber ${response.user.phoneNumber}`,
                error
              );
            }
            try {
              await login(user);
              router.push("/profill");
            } catch (error) {
              setErrorMessage(error.message);
            }
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.log(error);
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <MUIInput
        type="text"
        id="verificationCode"
        name="verificationCode"
        placeholder="verificationCode"
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched("verificationCode", true, true)}
        value={formik.values.verificationCode}
        error={formik.errors.verificationCode}
        isTouched={formik.touched.verificationCode}
      />
      <Button
        // className={styles.button}
        type="submit"
        // isLoading={isLoginLoading}
      >
        Confirm code
      </Button>
    </form>
  );
};
export default VerificationCodeForm;
