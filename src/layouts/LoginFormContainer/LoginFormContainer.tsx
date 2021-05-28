import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { getFirebaseClient } from "next-firebase-auth";
import { useRouter } from "next/router";
import { loginFormSchema } from "helpers/formValidationSchemas";
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
  const [isLoginLoading, setLoginLoader] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      // TODO: IF EMAIL IS NOT IN LOCALSTOREAGE, show form: "Confirm your email to sign in":
      // TODO: auto focus á form.
      if (email) {
        firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      let user;
      try {
        user = await GetUserByEmail(values.email);
      } catch (error) {
        console.log(`No user found with email ${values.email}`, error);
      }

      if (!user) {
        firebase
          .auth()
          .sendSignInLinkToEmail(values.email, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem("emailForSignIn", values.email);
            // ...
          })
          .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            // ...
          });
      } else {
        firebase
          .auth()
          .signInWithEmailLink(values.email, values.password)
          .then((result) => {
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }

      // TODO: if email does not exist in database, then sendSignInLinkToEmail
      // firebase
      //   .auth()
      //   .sendSignInLinkToEmail(values.email, actionCodeSettings)
      //   .then(() => {
      //     // The link was successfully sent. Inform the user.
      //     // Save the email locally so you don't need to ask the user for it again
      //     // if they open the link on the same device.
      //     window.localStorage.setItem("emailForSignIn", values.email);
      //     // ...
      //   })
      //   .catch((error) => {
      //     console.log(error.code);
      //     console.log(error.message);
      //     // ...
      //   });
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(values.userName, values.password)
      //   .then((userCredential) => {
      //     // Signed in
      //     const { user } = userCredential;
      //     console.log("user", user);
      //     // ...
      //   })
      //   .catch((error) => {
      //     console.log(error.code);
      //     console.log(error.message);
      //   });
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

          <Link href="/nyskra" as="/nyskra">
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
