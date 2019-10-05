/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import nextCookie from "next-cookies";
import { MainLayout } from "../layouts";
import { logout, withAuth } from "../utils/auth";

const Profile = (props) => {
  const { name, bio } = props;

  return (
    <MainLayout>
      <h1>{name}</h1>
      <p>{bio}</p>
      <button type="submit" onClick={logout}>
        Logout
      </button>
      <style jsx>{`
        img {
          max-width: 200px;
          border-radius: 0.5rem;
        }
        h1 {
          margin-bottom: 0;
        }
        .lead {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
          color: #666;
        }
        p {
          color: #6a737d;
        }
      `}</style>
    </MainLayout>
  );
};

Profile.propTypes = {
  data: PropTypes.object.isRequired
};
Profile.getInitialProps = async (ctx) => {
  const { spez_user_token: token } = nextCookie(ctx);
  const url = `${process.env.API_URL}/api/profile`;
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
