/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import nextCookie from "next-cookies";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/actions";
import { UserLayout, ProfileContainer } from "layouts";
import wrapper from "../store/configureStore";
import withSession from "../lib/sessions";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  // Get profile for user from cookie
  if (user && user.login && !Object.entries(store.auth).length > 0) {
    dispatch(login(user.login));
  }
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ req, res }) => {
    const user = req.session.get("user");

    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    // await store.dispatch(login(user.login));
    return {
      props: { user: req.session.get("user") }
    };
  })
);

export default Profile;
