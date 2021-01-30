import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "store/actions";
import { registerFormSchema } from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { Button, Input } from "components";
import { MUIInput } from "components/Input";
import styles from "./RegisterContainer.module.scss";

const RegisterContainer = (): ReactElement => {
  const [newUser, setNewUser] = useState({});
  const [hasRegistered, setHasRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isBeingLoggedIn, setIsBeingLoggedIn] = useState(false);
  const store = useSelector((state) => state);
  const { register } = useAuth();
  const { users } = store;

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      const body = {
        userName: values.userName,
        password: values.password,
        confirmPassword: values.confirmPassword
      };

      try {
        console.log("DO REGISTER STUFF");
        // await register(body);
        Router.push("/profile");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  });

  // const registerNewUser = async () => {
  //   await dispatch(
  //     createUser({
  //       // ssn: newUser.ssn,
  //       userName: newUser.userName,
  //       password: newUser.password
  //       // firstName: newUser.firstName,
  //       // lastName: newUser.lastName,
  //       // email: newUser.email,
  //       // website: newUser.website,
  //       // phoneNumber: newUser.phoneNumber,
  //       // streetName: newUser.streetName,
  //       // city: newUser.city,
  //       // postalCode: newUser.postalCode,
  //       // country: newUser.country
  //     })
  //   );
  //   setHasRegistered(true);
  //   try {
  //     // TODO: What happens if the connection is slow? Will this fail?
  //     setTimeout(() => {
  //       register(newUser.userName);
  //     }, 1000);
  //     Router.push("/profile");
  //   } catch (error) {
  //     // TODO: I don't think this errormessage will ever show
  //     setErrorMessage(`Something went wrong. ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   if (users && !users.error && hasRegistered) {
  //     // TODO: Waiting to be logged in, show a spinner?
  //     setIsBeingLoggedIn(true);
  //   } else if (users.error) {
  //     setIsBeingLoggedIn(false);
  //     setErrorMessage(users.error.response.error);
  //   }
  // }, [hasRegistered, users, users.error]);

  // const handleChange = (event) => {
  //   setNewUser({ ...newUser, [event.target.name]: event.target.value });
  // };

  return (
    <div {...useMaxWidth()} className={styles.wrapper}>
      <span className={styles.heading}>Nýskráning</span>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.inner_form}>
          <div className={styles.column}>
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
            <div className={styles.display_username_card}>
              <span className={styles.info}>
                Svona mun slóðin á þinn prófil líta út.
              </span>
              <span className={styles.url}>
                kontaktar.is/n/<strong>{formik.values.userName}</strong>
              </span>
            </div>
          </div>
          <div className={styles.column}>
            <MUIInput
              type="password"
              id="password"
              name="password"
              placeholder="Lykilorð"
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched("password", true, true)}
              value={formik.values.password}
              error={formik.errors.password || !!formik.errors.confirmPassword}
              isTouched={formik.touched.password}
            />
            <MUIInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enturtaka lykilorð"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched("confirmPassword", true, true)
              }
              value={formik.values.confirmPassword}
              error={formik.errors.confirmPassword}
              isTouched={formik.touched.confirmPassword}
            />
          </div>
          <Button className={styles.button} type="submit">
            Nýskrá
          </Button>
        </div>
        <p className={styles.error}>{errorMessage}</p>

        {/* <Link href="/register" as="/register">
            <Button className={styles.button} modifier={["inverted"]}>
              Stofna nýjan aðgang
            </Button>
          </Link> */}
      </form>
      {/* </div>
      <Button
        disabled={isBeingLoggedIn}
        type="button"
        onClick={registerNewUser}
      >
        Nýskrá
      </Button>
      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage.toString()}</p>
      )}
    </div> */}
    </div>
  );
};

export default RegisterContainer;
