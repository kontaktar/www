import React, { ReactElement, useState } from "react";
import { useFormik } from "formik";
import { useAuth as useFirebaseAuth } from "providers/FirebaseAuthUser";
import { useLoginForm } from "providers/LoginForm";
import { UserEnum } from "types";
import { phoneNumberSchema } from "helpers/formValidationSchemas";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "layouts/LoginFormContainer/LoginFormContainer.module.scss";

type Props = {
  disabled: boolean;
};
const PhoneNumberForm = ({ disabled }: Props): ReactElement => {
  const { setVerificationCodeSent, setUserPhoneNumber, setErrorMessage } =
    useLoginForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { verificationCodeSent, signInWithPhoneNumber } = useFirebaseAuth();
  const formik = useFormik({
    initialValues: {
      phoneNumber: ""
    },
    validationSchema: phoneNumberSchema,
    onSubmit: async (values) => {
      setUserPhoneNumber(values.phoneNumber);
      setLoading(true);

      try {
        signInWithPhoneNumber(values.phoneNumber);
        setLoading(true);
        setVerificationCodeSent(true);
      } catch (err) {
        setLoading(false);
        setVerificationCodeSent(true);
        setErrorMessage("TODO: Error message");
      }
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
