import {
  createUser,
  getUserById,
  getUserByPhoneNumber,
  getUserByUserName
} from "database/queries/user";
import type { NextApiResponse } from "next";
import type { NextIronRequest } from "types";
import { IronSession } from "types";
import { isAdminOrAuthorizedUser, isCurrentUserUnregistered } from "lib/auth";
import { withSession } from "lib/sessions";
import { debug, debugError } from "helpers/debug";

const getUserFromSession = async (
  request: NextIronRequest,
  response: NextApiResponse
) => {
  const userData = request.session?.get(IronSession.UserSession);
  if (userData) {
    response.json({
      isLoggedIn: true,
      ...userData
    });
  } else {
    response.json({
      isLoggedIn: false
    });
  }
};

export default withSession(
  async (request: NextIronRequest, response: NextApiResponse) => {
    const { body, method, query } = request;
    if (method === "GET") {
      if (Object.keys(query).length === 0) {
        await getUserFromSession(request, response);
      } else if (query?.userName) {
        await getUserByUserName(request, response);
      } else if (query?.phoneNumber) {
        await getUserByPhoneNumber(request, response);
      } else if (query?.id) {
        await getUserById(request, response);
      } else {
        response.status(404).json({ message: "Not found" });
      }
    } else if (method === "POST") {
      if (await isCurrentUserUnregistered(request, response)) {
        // CREATE USER
        await createUser(request, response);
      } else {
        response.status(401).json({ message: "Forbidden" });
      }
    }
    response.status(404);
  }
);
