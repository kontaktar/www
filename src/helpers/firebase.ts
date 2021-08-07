import { responsiveFontSizes } from "@material-ui/core";
import firebase from "firebase/app";
import { v4 as uuid } from "uuid";
import { Routes, SessionStorage } from "types";
import { CreateUser, GetUserByPhoneNumber } from "lib/endpoints";
import fetch from "lib/fetchJson";
import { debugError } from "helpers/debug";
import { verificationErrors } from "helpers/errorMessages";

export const bypassWarningMessage = `WARNING! BYPASSING FIREBASE`;

export const shouldBypassFirebaseOnDevelopment =
  process.env.NODE_ENV === "development" && process.env.BYPASS_FIREBASE === "1";

export const signInToFirebaseWithPhoneNumber = (
  phoneNumber: string,
  setVerificationCodeSent: (b: boolean) => void,
  setErrorMessage: (m: string) => void,
  setLoading: (b: boolean) => void
): void => {
  firebase.auth().settings.appVerificationDisabledForTesting =
    process.env.FIREBASE_EMULATOR === "1";

  const appVerifier = (window as any).recaptchaVerifier;
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      (window as any).confirmationResult = confirmationResult;
      setVerificationCodeSent(true);
    })
    .catch((error) => {
      if (error.code === "auth/invalid-phone-number") {
        // TODO: Move this validation to formik/yup
        setErrorMessage(
          `Villa, sláið inn símanúmer á þessu formi: +3545554444`
        );
      }
      if (error.code === "auth/too-many-requests") {
        setErrorMessage(verificationErrors.TOO_MANY_REQUESTS);
      }
      setErrorMessage(`Villa kom upp, skilaboð ekki send. ${error}`);
      setLoading(false);
      debugError(`PhoneNumberForm Error: ${error}`);
    });
};

export const loginOrRegisterBypassingFirebase = async (
  userPhoneNumber,
  login,
  firebaseTokenId,
  setLoading,
  dispatchToStore,
  createUserSuccess,
  router
): Promise<void> => {
  // DEPRECATED
  let userData;
  try {
    userData = await GetUserByPhoneNumber(userPhoneNumber);
  } catch (error) {
    setLoading(false);
    debugError(error);
  }
  if (userData) {
    await login(userData, firebaseTokenId);
  } else {
    const mockFirebaseId = uuid();
    const { userId } = await CreateUser({
      phoneNumber: userPhoneNumber,
      createdAt: new Date(),
      firebaseId: mockFirebaseId
    });
    if (userId) {
      window.sessionStorage.setItem(SessionStorage.UserId, userId);
      // TODO: is this needed?
      dispatchToStore(
        createUserSuccess(userId, { phoneNumber: userPhoneNumber })
      );
      router.push(Routes.Register);
    }
  }
};

export const getEmulatorVerificationCode = async (
  phoneNumber: string
): Promise<string> => {
  console.log();
  const response = await fetch(
    `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/emulator/v1/projects/${process.env.FIREBASE_PROJECT_ID}/verificationCodes`
  );

  const { code } = response.verificationCodes
    .reverse()
    .find((v) => v.phoneNumber === phoneNumber);

  return code;
};
