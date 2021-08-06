import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Routes } from "types";
import useUser from "lib/useUser";
import useAuth from "hooks/useAuth";
import { LoginFormContainer, MainLayout } from "layouts";

const Login: NextPage = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const { user } = useUser();
  if (user.isLoggedIn) {
    router.push(Routes.Profile);
  }
  React.useEffect(() => {
    if (user?.details?.phoneNumber && !user?.isLoggedIn) {
      logout();
    }
  }, [user]);

  return (
    <MainLayout noDistraction>
      <LoginFormContainer />
    </MainLayout>
  );
};

export default Login;
