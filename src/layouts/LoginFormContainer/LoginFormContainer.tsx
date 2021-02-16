import React, { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { loginFormSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button } from "components";
import { MUIInput } from "components/Input";
import Link from "components/LinkWrap";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = (): React.ReactElement => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoginLoading, setLoginLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      const body = {
        userName: values.userName,
        password: values.password
      };

      try {
        setLoginLoader(true);
        await login(body);
        router.push("/profile");
      } catch (error) {
        setErrorMessage(error.message);
        // eslint-disable-next-line no-console
        console.error(error);
        setLoginLoader(false);
      }
    }
  });

  return (
    <div>
      <div {...useMaxWidth()}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <MUIInput
            type="text"
            id="userName"
            name="userName"
            placeholder="Notendanafn"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("userName", true, true)}
            value={formik.values.userName}
            error={formik.errors.userName}
            isTouched={formik.touched.userName}
          />
          <MUIInput
            type="password"
            id="password"
            name="password"
            placeholder="Lykilorð"
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("password", true, true)}
            value={formik.values.password}
            error={formik.errors.password}
            isTouched={formik.touched.password}
          />
          <p className={styles.error}>{errorMessage}</p>
          <Button
            className={styles.button}
            type="submit"
            isLoading={isLoginLoading}
          >
            Innskrá
          </Button>
          <span className={styles.or}>
            <span>eða</span>
          </span>

          <Link href="/register" as="/register">
            <Button className={styles.button} modifier={["inverted"]}>
              Stofna nýjan aðgang
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginFormContainer;
