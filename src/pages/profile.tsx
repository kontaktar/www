import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { UserSessionStorage } from "types";
// import { NextRouter, useRouter } from "next/router";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { ProfileContainer, UserLayout } from "layouts";

const Profile: FC = () => {
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req, res }) => {
    const user: UserSessionStorage = req && req.session?.get("user");

    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: {}
    };
  })
);

export default Profile;
