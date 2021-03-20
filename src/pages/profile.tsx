import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { UserSessionStorage } from "types";
import wrapper from "store/configureStore";
import withSession from "lib/sessions";
import { ProfileContainer, UserLayout } from "layouts";

const Profile = ({ reroute }): any => {
  const router = useRouter();
  useEffect(() => {
    if (reroute) {
      router.push("/login");
    }
  });
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req, res }) => {
    const user: UserSessionStorage = req?.session?.get("user");

    if (user === undefined) {
      return { props: { reroute: true } };
    }

    return {
      props: {}
    };
  })
);

export default Profile;
