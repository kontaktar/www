import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import { LoginFormContainer, MainLayout } from "layouts";

const Login: NextPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
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
