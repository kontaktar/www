import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import useMaxWidth from "hooks/useMaxWidth";
import PhoneNumberForm from "components/Login/PhoneNumberForm";
import VerificationCodeForm from "components/Login/VerificationCodeForm";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = (): ReactElement => {
  const [isVerificationCodeSent, setVerificationCodeSent] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("recatpcha callback", response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        }
      );
    } catch (error) {
      console.log("eeee", error);
    }
  }, []);

  /// ////////
  ///
  /// Phone number has to have a country code with a +
  /// +3546952489 is valid
  //

  return (
    <div>
      <div id="recaptcha-container" />
      <div {...useMaxWidth()}>
        {/* {signInAllowed ? ( */}
        <>
          {!isVerificationCodeSent ? (
            <PhoneNumberForm
              setVerificationCodeSent={setVerificationCodeSent}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <VerificationCodeForm setErrorMessage={setErrorMessage} />
          )}
        </>
        {/* ) : (
          <span className={styles.error}>
            Eitthvað mistókst að auðkenna þig, vinsamlegast reyndu aftur síðar
          </span>
        )} */}
      </div>
      <span className={styles.error}>{errorMessage}</span>
    </div>
  );
};

export default LoginFormContainer;
