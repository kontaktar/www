import React, { ReactElement, useEffect, useState } from "react";
import firebase from "firebase/app";
import { debug, debugError } from "helpers/debug";
import useMaxWidth from "hooks/useMaxWidth";
import PhoneNumberForm from "components/Login/PhoneNumberForm";
import VerificationCodeForm from "components/Login/VerificationCodeForm";
import styles from "./LoginFormContainer.module.scss";

const LoginFormContainer = (): ReactElement => {
  const [isVerificationCodeSent, setVerificationCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);

  useEffect(() => {
    try {
      (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            debug(`Recatpcha callback: ${response}`);
          }
        }
      );
    } catch (error) {
      setErrorMessage(error.message);
      setVerificationCodeSent(false);
      setRecaptchaFailed(true);
      debugError(`RecaptchaError: ${error}`);
    }
  }, []);

  return (
    <>
      <div id="recaptcha-container" />
      <div {...useMaxWidth()}>
        <>
          {!isVerificationCodeSent ? (
            <PhoneNumberForm
              disabled={recaptchaFailed}
              setVerificationCodeSent={setVerificationCodeSent}
              setErrorMessage={setErrorMessage}
              setUserPhoneNumber={setUserPhoneNumber}
            />
          ) : (
            <VerificationCodeForm
              userPhoneNumber={userPhoneNumber}
              setVerificationCodeSent={setVerificationCodeSent}
              setErrorMessage={setErrorMessage}
            />
          )}
        </>
      </div>
      <span className={styles.error}>{errorMessage}</span>
    </>
  );
};

export default LoginFormContainer;
