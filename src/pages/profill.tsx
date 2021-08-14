import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { IronSession, Routes, UserSessionStorage } from "types";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { debug } from "helpers/debug";
import { ProfileContainer, UserLayout } from "layouts";

type Props = {
  reroute?: boolean;
};
const Profile: NextPage<Props> = ({ reroute }) => {
  const router = useRouter();
  useEffect(() => {
    if (reroute) {
      router.push(Routes.Login);
    }
  });
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req }) => {
    const user: UserSessionStorage = req?.session?.get(IronSession.UserSession);

    debug("getServerSideProps user", user);

    if (user === undefined) {
      return { props: { reroute: true } };
    }

    return {
      props: {}
    };
  })
);

export default Profile;
