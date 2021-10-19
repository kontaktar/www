import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { IronSession, Routes } from "types";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { debug, debugWarn } from "helpers/debug";
import { MainLayout, RegisterContainer } from "layouts";

type Props = {
  reroute?: boolean;
  href?: Routes;
};
const Register: NextPage<Props> = ({ href, reroute }) => {
  const router = useRouter();
  useEffect(() => {
    if (reroute) {
      router.push(href);
    }
  });

  return (
    <MainLayout noDistraction={reroute}>
      {!reroute && <RegisterContainer />}
    </MainLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req }) => {
    const user = req.session.get(IronSession.UserSession);
    debug("user from session", user);
    if (user !== undefined && user?.details?.userName) {
      return { props: { reroute: true, href: Routes.Profile } };
    }
    if (!user) {
      debugWarn("NO MATCHING USER IN SESSION - Reroute to: /innskra", user);
      return { props: { reroute: true, href: Routes.Login } };
    }
    return {
      props: {}
    };
  })
);

export default Register;
