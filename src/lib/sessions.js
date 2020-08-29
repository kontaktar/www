// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";

const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "userSession",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"
    }
  });
};
export default withSession;
