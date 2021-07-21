import React from "react";
import { NextPage } from "next";
import { useAuthUser, withAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";
import { Routes } from "types";
import useAuth from "hooks/useAuth";
import { LoginFormContainer, MainLayout } from "layouts";

const Login: NextPage = () => {
  const router = useRouter();
  const firebaseUser = useAuthUser();
  // eslint-disable-next-line no-console
  console.log("firebaseUser", firebaseUser);

  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    router.push(Routes.Profile);
  }

  return (
    <MainLayout noDistraction>
      <LoginFormContainer />
    </MainLayout>
  );
};

export default withAuthUser()(Login);
