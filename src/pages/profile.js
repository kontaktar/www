/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import nextCookie from "next-cookies";
import { UserLayout, ProfileContainer } from "layouts";
import withSession from "../lib/sessions";

const Profile = () => {
  return (
    <UserLayout>
      <ProfileContainer editMode />
    </UserLayout>
  );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") }
  };
});

export default Profile;
