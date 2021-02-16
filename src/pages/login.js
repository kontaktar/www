import React from "react";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import { LoginFormContainer, MainLayout } from "layouts";

const Login = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  if (isLoggedIn) {
    router.push("/profile");
  }
  return (
    <MainLayout noDistraction>
      <LoginFormContainer />
    </MainLayout>
  );
};

export default Login;
