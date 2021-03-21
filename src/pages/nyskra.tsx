import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { MainLayout, RegisterContainer } from "layouts";

type Props = {
  reroute?: boolean;
};
const Register: NextPage<Props> = ({ reroute }) => {
  const router = useRouter();
  useEffect(() => {
    if (reroute) {
      router.push("/profill");
    }
  });
  return (
    <MainLayout>
      <RegisterContainer />
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req }) => {
    const user = req.session.get("user");
    if (user !== undefined) {
      return { props: { reroute: true } };
    }
    return {
      props: {}
    };
  })
);

export default Register;
