import React from "react";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { MainLayout, RegisterContainer } from "layouts";

const Register = () => {
  return (
    <MainLayout>
      <RegisterContainer />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req, res }) => {
    const user = req.session.get("user");

    if (user !== undefined) {
      res.setHeader("location", "/profile");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
    return {
      props: {}
    };
  })
);

export default Register;
