/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import nextCookie from "next-cookies";
import { logout, withAuth } from "utils/auth";
import { UserLayout, ProfileContainer } from "layouts";

const Profile = () => {
  return (
    <UserLayout>
      <ProfileContainer editMode userName="hannes" />
    </UserLayout>
  );
};

Profile.getInitialProps = async (ctx) => {
  const { spez_user_token: token } = nextCookie(ctx);
  const url = `/api/profile`;
  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token })
      }
    });
    if (response.ok) {
      console.log("is ok");
      return await response.json();
    }
    return redirectOnError();
  } catch (error) {
    return redirectOnError();
  }
};

export default withAuth(Profile);
