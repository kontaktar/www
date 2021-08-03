import React, { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { UserData } from "types";
import {
  bypassWarningMessage,
  shouldBypassFirebaseOnDevelopment,
  signInToFirebaseWithPhoneNumber
} from "helpers/firebase";
import { phoneNumberSchema } from "helpers/formValidationSchemas";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  setVerificationCodeSent: (b: boolean) => void;
  setErrorMessage: (m: string) => void;
  setUserPhoneNumber: (pN: string) => void;
  disabled: boolean;
};
const PhoneNumberForm = ({
  setVerificationCodeSent,
  setErrorMessage,
  setUserPhoneNumber,
  disabled
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

      // 1/3 STEPS IN BYPASSING FIREBASE
      if (shouldBypassFirebaseOnDevelopment) {
        setVerificationCodeSent(true);
        setErrorMessage(bypassWarningMessage);
      } else {
        setErrorMessage("");
      }

      signInToFirebaseWithPhoneNumber(
        values.phoneNumber,
        setVerificationCodeSent,
        setErrorMessage,
        setLoading
      );
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
        disabled={disabled}
      />
      <Button
        className={styles.button}
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Innskrá
      </Button>
    </form>
  );
};
export default PhoneNumberForm;
