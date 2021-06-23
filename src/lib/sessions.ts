/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";
import { IronSession } from "types";

const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: IronSession.Name,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"
    }
  });
};
export default withSession;
