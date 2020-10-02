import React from "react";
// import { useSelector } from "react-redux";
import { UserLayout, ProfileContainer } from "layouts";
// import { login } from "store/actions";
// import useAuth from "hooks/useAuth";
import wrapper from "../store/configureStore";
import withSession from "../lib/sessions";

// eslint-disable-next-line react/prop-types
const Profile = () => {
  // const store = useSelector((state) => state);
  // console.log("props", props);
  // const { isLoggedIn } = useAuth();

  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
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
