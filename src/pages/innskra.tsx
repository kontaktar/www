import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createUser } from "store/actions";
import useAuth, { addFirebaseConnection } from "hooks/useAuth";
import { LoginFormContainer, MainLayout } from "layouts";

const Login: NextPage = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  // const [isEmailSent, setEmailSent] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const isNewUser = user
            ? user?.metadata?.creationTime === user?.metadata?.lastSignInTime
            : false;

          if (isNewUser && user.emailVerified) {
            router.push("/nyskra");
          }
        }
      });
    return () => unregisterAuthObserver(); // un-register observers on unmounts.
  }, []);

  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    router.push("/profill");
  }

  return (
    <MainLayout noDistraction>
      <LoginFormContainer />
    </MainLayout>
  );
};

export default Login;
