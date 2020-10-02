import React from "react";
// import Router from "next/router";
import { MainLayout, RegisterContainer } from "layouts";
import useAuth from "hooks/useAuth";
import wrapper from "../store/configureStore";
import withSession from "../lib/sessions";

const Register = () => {
  const test = useAuth();

  console.log("wtf?", test);
  // if (isLoggedIn) {
  //   Router.push("/profile");
  // }
  return (
    <MainLayout>
      <RegisterContainer />
    </MainLayout>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, req, res }) => {
    const user = req.session.get("user");
    console.log("user", user);
    console.log("user", user);
    console.log("user", user);

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
