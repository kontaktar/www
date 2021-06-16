import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { phoneNumberSchema } from "helpers/formValidationSchemas";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  setVerificationCodeSent: (b: boolean) => void;
  setErrorMessage: (m: string) => void;
};
const PhoneNumberForm = ({
  setVerificationCodeSent,
  setErrorMessage
}: Props): React.ReactElement => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: ""
    },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values) => {
      const appVerifier = (window as any).recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(values.phoneNumber, appVerifier)
        .then((confirmationResult) => {
          (window as any).confirmationResult = confirmationResult;

          console.log("confirmationResult", confirmationResult);

          setVerificationCodeSent(true);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-phone-number") {
            setErrorMessage(
              `Villa, sláið inn símanúmer á þessu formi: +3545554444`
            );
          } else {
            setErrorMessage(`Villa kom upp, skilaboð ekki send ${error}`);
          }
          console.log("error", error);
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <MUIInput
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        placeholder="Símanúmer"
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched("phoneNumber", true, true)}
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        isTouched={formik.touched.phoneNumber}
      />
      <Button
        className={styles.button}
        type="submit"
        // isLoading={isLoginLoading}
      >
        Innskrá
      </Button>
    </form>
  );
};
export default PhoneNumberForm;
