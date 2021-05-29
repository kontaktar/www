import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { getFirebaseClient } from "next-firebase-auth";
import { useRouter } from "next/router";
import {
  emailConfirmationSchema,
  loginFormSchema
} from "helpers/formValidationSchemas";
import useAuth from "hooks/useAuth";
import useMaxWidth from "hooks/useMaxWidth";
import { GetUserByEmail } from "pages/api/endpoints";
import { Button } from "components";
import { MUIInput } from "components/Input";
import Link from "components/LinkWrap";
import styles from "./LoginFormContainer.module.scss";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  // url: "http://www.kontaktar.is/innskra",
  url:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3000/innskra"
      : "http://www.kontaktar.is/innskra",
  // This must be true.
  handleCodeInApp: true
  // dynamicLinkDomain: "example.page.link"
};
const LoginFormContainer = (): ReactElement => {
  // const firebase = getFirebaseClient();
  // console.log("firebase", firebase);
  const { login } = useAuth();
  const router = useRouter();
  const [isEmailSent, setEmailSent] = useState(false);
  const [isUserNew, setIsNewUser] = useState(false);
  const [
    isWaitingForEmailConfirmation,
    setWaitingForEmailConfirmation
  ] = useState(false);
  const [
    isMissingEmailForEmailLinkLogin,
    setIsMissingEmailForEmailLinkLogin
  ] = useState(false);
  const [isLoginLoading, setLoginLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (/* USER IS NEW && */ user.emailVerified) {
          router.push("/nyskra");
          console.log("USER IS REGISTERED");
          // go on to register!
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      setEmailSent(false);
      const email = window.localStorage.getItem("emailForSignIn");

      // TODO: IF EMAIL IS NOT IN LOCALSTOREAGE, show form: "Confirm your email to sign in":
      // TODO: auto focus á form.
      window.sessionStorage.setItem("loginHref", window.location.href);
      if (email) {
        firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.sessionStorage.sessionStorage.removeItem("loginHref");
            window.localStorage.removeItem("emailForSignIn");

            // user has been verified
            console.log("result.user", result.user);
            // firebase.auth().currentUser.updatePassword()
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      } else {
        setIsMissingEmailForEmailLinkLogin(true);
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: isMissingEmailForEmailLinkLogin
      ? emailConfirmationSchema
      : loginFormSchema,
    onSubmit: async (values) => {
      if (isMissingEmailForEmailLinkLogin) {
        const loginHref = sessionStorage.getItem("loginHref");
        firebase
          .auth()
          .signInWithEmailLink(values.email, loginHref)
          .then((result) => {
            window.sessionStorage.sessionStorage.removeItem("loginHref");

            console.log("YAAAA LOGIN EMAIL LINK", result);
            // result.user.sendEmailVerification();
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            console.log("err", error);
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      } else {
        let user;
        try {
          user = await GetUserByEmail(values.email);
        } catch (error) {
          console.log(`No user found with email ${values.email}`, error);
        }

        if (!user) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((result) => {
              setWaitingForEmailConfirmation(true);
              // setIsNewUser(true);
              console.log("reulst", result);
              result.user.sendEmailVerification(actionCodeSettings);
              // You can check if the user is new or existing:
              // result.additionalUserInfo.isNewUser
            })
            .catch((error) => {
              // Some error occurred, you can inspect the code: error.code
              // Common errors could be invalid email and invalid or expired OTPs.
            });
        } else {
          firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then((result) => {
              console.log("reulst", result);
              // result.user.sendEmailVerification();
              // You can check if the user is new or existing:
              // result.additionalUserInfo.isNewUser
            })
            .catch((error) => {
              // Some error occurred, you can inspect the code: error.code
              // Common errors could be invalid email and invalid or expired OTPs.
            });
        }
      }

      // const body = {
      //   userName: values.userName,
      //   password: values.password
      // };
      // try {
      //   setLoginLoader(true);
      //   await login(body);
      //   router.push("/profill");
      // } catch (error) {
      //   setErrorMessage(error.message);
      //   // eslint-disable-next-line no-console
      //   console.error(error);
      //   setLoginLoader(false);
      // }
    }
  });

  return (
    <div>
      <div {...useMaxWidth()}>
        {/* {isEmailSent && <p>Email er á leiðinni</p>} */}
        {isWaitingForEmailConfirmation ? (
          <p>Vinsamlegast skoðaðu póstinn þinn til að staðfesta innskráningu</p>
        ) : (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <span className={styles.heading}>Innskráning</span>
            <MUIInput
              type="text"
              id="email"
              name="email"
              placeholder="Notendanafn"
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched("email", true, true)}
              value={formik.values.email}
              error={formik.errors.email}
              isTouched={formik.touched.email}
            />
            {isMissingEmailForEmailLinkLogin || (
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
            )}
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

            <Link href="/nyskra" as="/nyskra">
              <Button className={styles.button} modifier={["inverted"]}>
                Stofna nýjan aðgang
              </Button>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginFormContainer;
