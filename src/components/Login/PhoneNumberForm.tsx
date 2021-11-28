import React, { ReactElement, useState } from "react";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { useLoginForm } from "providers/LoginForm";
import { useRouter } from "next/router";
import { UserEnum } from "types";
import { getEmulatorVerificationCode } from "helpers/firebase";
import {
  bypassWarningMessage,
  isBypassingFirebase,
  signInToFirebaseWithPhoneNumber
} from "helpers/firebase";
import { phoneNumberSchema } from "helpers/formValidationSchemas";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  disabled: boolean;
};
const PhoneNumberForm = ({ disabled }: Props): ReactElement => {
  const router = useRouter();
  const {
    isVerificationCodeSent,
    setVerificationCodeSent,
    setUserPhoneNumber,
    setErrorMessage
  } = useLoginForm();
  const [isLoading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      phoneNumber: ""
    },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values) => {
      setUserPhoneNumber(values.phoneNumber);
      setLoading(true);

      signInToFirebaseWithPhoneNumber(
        values.phoneNumber,
        setVerificationCodeSent,
        setErrorMessage,
        setLoading,
        router
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
