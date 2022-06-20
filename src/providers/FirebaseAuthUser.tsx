import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useRouter } from "next/router";
import Firebase from "lib/firebaseInstance";
import {
  getEmulatorVerificationCode,
  isBypassingFirebase
} from "helpers/firebase";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithPhoneNumber: async (phoneNumber) => {},
  signOut: async () => {},
  firebaseIdToken: null,
  verificationCodeSent: false,
  emulatorCode: null
});

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  phoneNumber: user.phoneNumber
});

const AuthUserProvider = ({ children }) => {
  const router = useRouter();
  const [firebaseIdToken, setFirebaseIdToken] = useState("");
  const [emulatorCode, setEmulatorCode] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    authState.getIdToken().then(async (idToken) => {
      setFirebaseIdToken(idToken);
    });

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithPhoneNumber = useCallback((phoneNumber) => {
    const appVerifier = (window as any).recaptchaVerifier;
    return Firebase.auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(async (confirmationResult) => {
        (window as any).confirmationResult = confirmationResult;
        setVerificationCodeSent(true);

        if (isBypassingFirebase) {
          setEmulatorCode(await getEmulatorVerificationCode(phoneNumber));
        }
      })
      .catch((error) => {
        console.error("usaVerificationCondeSent error; ", error);
        //   if (error.code === "auth/captcha-check-failed") {
        //     setErrorMessage(verificationErrors.CAPTCHA_CHECK_FAILED);
        //     router.reload();
        //   } else if (error.code === "auth/invalid-phone-number") {
        //     // TODO: Move this validation to formik/yup
        //     setErrorMessage(verificationErrors.INVALID_PHONE_NUMBER);
        //   } else if (error.code === "auth/too-many-requests") {
        //     setErrorMessage(verificationErrors.TOO_MANY_REQUESTS);
        //   } else if (error.code === "auth/network-request-failed") {
        //     setErrorMessage("TURN ON THE FIREBASE EMULATOR");
        //     debugError(`NETWORK REQUEST FAILED - ${error} - CODE: ${error.code}`);
        //   } else {
        //     setErrorMessage(
        //       `Villa kom upp, skilaboð ekki send. ${error} - CODE: ${error?.code}`
        //     );
        //   }
        //   setLoading(false);
        //   debugError(`PhoneNumberForm Error: ${error}`);
        // });
      });
  }, []);

  const signOut = useCallback(() => Firebase.auth().signOut().then(clear), []);

  // useEffect(() => {
  //   console.log('router', router)
  //   console.log('authUser', authUser)
  //   // TODO:
  //   // TODO:
  //   // TODO:
  //   // TODO:
  //   // TODO:
  //   // TODO:
  //   // if (!loading && !authUser && !['/', '/innskra'].includes(router.pathname)) {
  //   //   router.push('/')
  //   // }
  // }, [authUser, loading, router])

  useEffect(() => {
    const unregisterAuthObserver =
      Firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unregisterAuthObserver(); // un-register observers on unmounts.
  }, []);

  const contextValues = useMemo(
    () => ({
      firebaseIdToken,
      authUser,
      loading,
      signInWithPhoneNumber,
      signOut,
      verificationCodeSent,
      emulatorCode
    }),
    [
      firebaseIdToken,
      authUser,
      loading,
      signInWithPhoneNumber,
      signOut,
      verificationCodeSent,
      emulatorCode
    ]
  );
  return (
    <authUserContext.Provider value={contextValues}>
      {children}
    </authUserContext.Provider>
  );
};
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
AuthUserProvider.whyDidYouRender = true;
export default AuthUserProvider;
