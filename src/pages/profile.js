/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { END } from "redux-saga";
import { getUserByUserNameSuccess, loginSuccess } from "store/actions";
import { UserLayout, ProfileContainer } from "layouts";
import { GetUserByUserName } from "src/pages/api/endpoints";
import wrapper from "../store/configureStore";
import withSession from "../lib/sessions";

const Profile = () => {
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

    // Had to disassemble dispatch(login(...)),
    // fetch not working properly inside saga with getServerSideProps
    // probably need something like https://github.com/pburtchaell/redux-promise-middleware/
    if (
      (user && user.login && store && !store.auth) ||
      !Object.entries(store.auth).length > 0
    ) {
      // Get profile for user from cookie
      const results = await GetUserByUserName(user.login);
      store.dispatch(getUserByUserNameSuccess(results));
      store.dispatch(loginSuccess(results));

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return {
      props: {}
    };
  })
);

export default Profile;
