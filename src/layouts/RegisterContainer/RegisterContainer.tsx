import { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import Router from "next/router";
import { useSelector } from "react-redux";
import { registerErrors } from "helpers/errorMessages";
import { registerFormSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button } from "components";
import { MUIInput } from "components/Input";
import styles from "./RegisterContainer.module.scss";

const RegisterContainer = (): ReactElement => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isBeingLoggedIn, setIsBeingLoggedIn] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const users = useSelector((state) => state.users);
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      userName: "aa",
      password: "123",
      confirmPassword: "123",
      ssn: "130982119",
      email: "a@1b1.is",
      firstName: "TEST",
      lastName: "TESTERSON"
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      const body = {
        userName: values.userName,
        password: values.password,
        // confirmPassword: values.confirmPassword, // TODO:
        ssn: values.ssn,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName
      };

      try {
        setLoader(true);
        await register(body);

        setHasRegistered(true);

        Router.push("/profile");
      } catch (error) {
        if (error.message.includes("users_ssn_key")) {
          error.message = registerErrors.EXISTS_SSN;
        }
        if (error.message.includes("users_user_name_key")) {
          error.message = registerErrors.EXISTS_USER_NAME;
        }
        if (error.message.includes("users_email_key")) {
          error.message = registerErrors.EXISTS_EMAIL;
        }
        setErrorMessage(error.message);
        // eslint-disable-next-line no-console
        console.error(error, error.message);
        setLoader(false);
      }
    }
  });

  useEffect(() => {
    if (users && !users.error && hasRegistered) {
      // TODO: Waiting to be logged in, show a spinner?
      setIsBeingLoggedIn(true);
    } else if (users.error) {
      setIsBeingLoggedIn(false);
      setErrorMessage(users.error.response.error);
    }
  }, [hasRegistered, users, users.error]);

  return (
    <div {...useMaxWidth()}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <span className={styles.heading}>Nýskráning</span>

        <div className={styles.row}>
          <MUIInput
            type="text"
            className={styles.form_firstName}
            id={styles.firstName}
            name="firstName"
            placeholder="Fornafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("firstName", true, true)}
            value={formik.values.firstName}
            error={formik.errors.firstName}
            isTouched={formik.touched.firstName}
          />
          <MUIInput
            type="text"
            className={styles.form_lastName}
            id="lastName"
            name="lastName"
            placeholder="Eftirnafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("lastName", true, true)}
            value={formik.values.lastName}
            error={formik.errors.lastName}
            isTouched={formik.touched.lastName}
          />
        </div>
        <div className={styles.row}>
          <MUIInput
            type="number"
            id={styles.ssn}
            className={styles.form_ssn}
            name="ssn"
            placeholder="Kennitala"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("ssn", true, true)}
            value={formik.values.ssn}
            error={formik.errors.ssn}
            isTouched={formik.touched.ssn}
          />
          <MUIInput
            type="text"
            className={styles.form_email}
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("email", true, true)}
            value={formik.values.email}
            error={formik.errors.email}
            isTouched={formik.touched.email}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.display_username_card}>
            <span className={styles.info}>
              Svona mun slóðin á þinn prófil líta út.
            </span>
            <span className={styles.url}>
              kontaktar.is/serfraedingur/
              <strong>{formik.values.userName || "einar"}</strong>
            </span>
          </div>

          <MUIInput
            type="text"
            className={styles.form_userName}
            id="userName"
            name="userName"
            placeholder="Notendanafn / slóð"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("userName", true, true)}
            value={formik.values.userName}
            error={formik.errors.userName}
            isTouched={formik.touched.userName}
          />
        </div>
        <div className={styles.row}>
          <MUIInput
            type="password"
            className={styles.form_password}
            id="password"
            name="password"
            placeholder="Lykilorð"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("password", true, true)}
            value={formik.values.password}
            error={formik.errors.password}
            isTouched={formik.touched.password}
          />
          <MUIInput
            type="password"
            className={styles.form_password}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Staðfesta lykilorð"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("confirmPassword", true, true)}
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
            isTouched={formik.touched.confirmPassword}
          />
        </div>
        <p className={styles.error}>{errorMessage}</p>
        <Button
          disabled={isBeingLoggedIn}
          type="submit"
          isLoading={isLoading}
          className={styles.button}
        >
          Nýskrá
        </Button>
      </form>
    </div>
  );
};

export default RegisterContainer;

RegisterContainer.propTypes = {
  className: PropTypes.string
};
RegisterContainer.defaultProps = {
  className: ""
};
