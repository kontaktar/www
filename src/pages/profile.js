import React from "react";
import { UserLayout, ProfileContainer } from "layouts";
import wrapper from "../store/configureStore";
import withSession from "../lib/sessions";

// eslint-disable-next-line react/prop-types
const Profile = () => {
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store, req, res }) => {
    const user = req.session.get("user");

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
