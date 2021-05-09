import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NextPage } from "next";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/auth";
import useAuth from "hooks/useAuth";
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
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  if (isLoggedIn) {
    router.push("/profill");
  }
  return (
    <MainLayout noDistraction>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </MainLayout>
  );
};

export default Login;
