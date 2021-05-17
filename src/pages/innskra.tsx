import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NextPage } from "next";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        const isNewUser =
          user.metadata.creationTime === user.metadata.lastSignInTime;

        // TODO: FIGURE OUT THE EMAIL VERIFICATION
        if (isNewUser) {
          preRegisterUser(user.uid);
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
      <button
        type="button"
        onClick={() => console.log(firebase.auth().currentUser.uid)}
      >
        btn
      </button>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
          uiCallback={(callback) => console.log("callback", callback)}
        />
      ) : null}
    </MainLayout>
  );
};

export default Login;
