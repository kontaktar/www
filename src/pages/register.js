import React from "react";
import { withAuth, useAuth } from "utils/auth";
import { MainLayout, RegisterContainer } from "layouts";

const Register = () => {
  return (
    <MainLayout>
      <RegisterContainer />
    </MainLayout>
  );
};

Register.getInitialProps = async (ctx) => {
  const { isLoggedInServerSide } = useAuth();

  if (ctx && ctx.req && isLoggedInServerSide(ctx)) {
    ctx.res.writeHead(302, { Location: `/` });
    ctx.res.end();
  }
};

export default withAuth(Register);
