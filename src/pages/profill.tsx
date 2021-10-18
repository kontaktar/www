import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { IronSession, Routes, UserSessionStorage } from "types";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import useUser from "lib/useUser";
import { debug } from "helpers/debug";
import { ProfileContainer, UserLayout } from "layouts";

type Props = {
  reroute?: boolean;
  user?: UserSessionStorage;
};
const Profile: NextPage<Props> = ({ reroute, user: userServerSide }) => {
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    if (reroute || (!user && !userServerSide)) {
      router.push(Routes.Login);
    }
  }, [user, userServerSide]);
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
      props: { user }
    };
  })
);

export default Profile;
