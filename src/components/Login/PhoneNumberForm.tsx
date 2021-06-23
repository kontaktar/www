import React, { ReactElement, useState } from "react";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { UserData } from "types";
import { debugError } from "helpers/debug";
import { verificationErrors } from "helpers/errorMessages";
import { phoneNumberSchema } from "helpers/formValidationSchemas";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  setVerificationCodeSent: (b: boolean) => void;
  setErrorMessage: (m: string) => void;
  setUserPhoneNumber: (pN: string) => void;
};
const PhoneNumberForm = ({
  setVerificationCodeSent,
  setErrorMessage,
  setUserPhoneNumber
}: Props): ReactElement => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      phoneNumber: ""
    },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values) => {
      setUserPhoneNumber(values.phoneNumber);
      setLoading(true);
      setErrorMessage("");
      if (
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_BYPASS_FIREBASE === "1"
      ) {
        // 1/3 step in bypassing firebase on localhost
        setVerificationCodeSent(true);

        return;
      }

      const appVerifier = (window as any).recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(values.phoneNumber, appVerifier)
        .then((confirmationResult) => {
          (window as any).confirmationResult = confirmationResult;
          setVerificationCodeSent(true);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-phone-number") {
            // TODO: Move this validation to formik/yup
            setErrorMessage(
              `Villa, sláið inn símanúmer á þessu formi: +3545554444`
            );
          }
          if (error.code === "auth/too-many-requests") {
            setErrorMessage(verificationErrors.TOO_MANY_REQUESTS);
          }
          setErrorMessage(`Villa kom upp, skilaboð ekki send. ${error}`);
          setLoading(false);
          debugError(`PhoneNumberForm Error: ${error}`);
        });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <MUIInput
        type="text"
        id={UserData.PhoneNumber}
        name={UserData.PhoneNumber}
        placeholder="Símanúmer"
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched(UserData.PhoneNumber, true, true)}
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        isTouched={formik.touched.phoneNumber}
      />
      <Button className={styles.button} type="submit" isLoading={isLoading}>
        Innskrá
      </Button>
    </form>
  );
};
export default PhoneNumberForm;
