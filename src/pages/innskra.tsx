import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NextPage } from "next";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import useAuth, { preRegisterUser, updateAuthState } from "hooks/useAuth";
import { LoginFormContainer, MainLayout } from "layouts";

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ],
  signInSuccessUrl: "/",
  credentialHelper: "none",
  callbacks: {
    // https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirecting based on
      // auth state in withAuthComponent.js.
      false
  }
};
const Login: NextPage = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

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

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        const isNewUser =
          user?.metadata?.creationTime === user?.metadata?.lastSignInTime;

        // TODO: FIGURE OUT THE EMAIL VERIFICATION
        console.log("user", user);
        if (isNewUser && user?.email) {
          // firebase
          //   .auth()
          //   .sendSignInLinkToEmail(user?.email, actionCodeSettings)
          //   .then(() => {
          //     setEmailSent(true);
          //     // The link was successfully sent. Inform the user.
          //     // Save the email locally so you don't need to ask the user for it again
          //     // if they open the link on the same device.
          //     window.localStorage.setItem("emailForSignIn", user?.email);
          //   })
          //   .catch((error) => {
          //     const errorCode = error.code;
          //     const errorMessage = error.message;
          //     // ...
          //   });
          preRegisterUser(user?.uid);
          // TODO: Reroute to /nyskra
        } else {
          updateAuthState({
            status: "PRE_LOGIN",
            isLoggedIn: true,
            userData: {
              id: user.uid,
              email: user.email
              // TODO: then pick up more info on the user.
            }
          });
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const { isLoggedIn } = useAuth();
  const router = useRouter();
  if (isLoggedIn) {
    router.push("/profill");
  }

  return (
    <MainLayout noDistraction>
      <LoginFormContainer />
      {/* {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
          uiCallback={(callback) => console.log("callback", callback)}
        />
      ) : null} */}
    </MainLayout>
  );
};

export default Login;
