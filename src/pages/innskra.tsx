import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Routes } from "types";
import useUser from "lib/useUser";
import { LoginFormContainer, MainLayout } from "layouts";

const Login: NextPage = () => {
  const router = useRouter();

  const { user } = useUser();
  if (user.isLoggedIn) {
    router.push(Routes.Profile);
  }

  return (
    <MainLayout noDistraction>
      <LoginFormContainer />
    </MainLayout>
  );
};

export default Login;
