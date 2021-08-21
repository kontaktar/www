import React, { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { UserEnum } from "types";
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
        id={UserEnum.PhoneNumber}
        name={UserEnum.PhoneNumber}
        placeholder="Símanúmer"
        onChange={formik.handleChange}
        onBlur={() => formik.setFieldTouched(UserEnum.PhoneNumber, true, true)}
        value={formik.values.phoneNumber}
        error={formik.errors.phoneNumber}
        isTouched={formik.touched.phoneNumber}
        disabled={disabled}
        data-test="PhoneNumberLoginInput"
      />
      <Button
        className={styles.button}
        type="submit"
        disabled={isLoading}
        isLoading={isLoading}
        data-test="PhoneNumberLoginButton"
      >
        Innskrá
      </Button>
    </form>
  );
};
export default PhoneNumberForm;
