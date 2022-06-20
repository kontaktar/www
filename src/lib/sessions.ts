// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import {
  DatabaseUser,
  IronSession,
  NextIronRequest,
  User,
  UserSessionStorage
} from "types";
import { debug, debugError } from "helpers/debug";

export function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: IronSession.UserSession,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"
    }
  });
}

export const saveUserToSession = async (
  request: NextIronRequest,
  response: NextApiResponse,
  user: UserSessionStorage
) => {
  try {
    const userFromSession = request.session.get(IronSession.UserSession);

    const userMerged = {
      ...userFromSession,
      ...user,
      details: {
        ...userFromSession?.details,
        ...user?.details
      },
      firebase: {
        ...userFromSession?.firebase,
        ...user?.firebase
      }
    };

    request.session.set(IronSession.UserSession, userMerged);
    debug("userMerged", userMerged);
    await request.session.save();
  } catch (error) {
    response.status(400).json({ message: error });
    throw new Error(`Failed to save to session storage ${error.message}`);
  }
};
