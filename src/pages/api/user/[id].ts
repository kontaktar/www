import {
  deleteUserById,
  editUser,
  getAuthorizedUserById,
  getUserById
} from "database/queries/user";
import * as admin from "firebase-admin";
import type { NextApiResponse } from "next";
import type { NextIronRequest } from "types";
import { IronSession } from "types";
import { isAdminOrAuthorizedUser, isAuthorizedUser } from "lib/auth";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import { withSession } from "lib/sessions";
import { debugError } from "helpers/debug";

const UserById = withSession(
  async (request: NextIronRequest, response: NextApiResponse) => {
    const { method } = request;

    if (method === "GET") {
      if (await isAuthorizedUser(request)) {
        await getAuthorizedUserById(request, response);
      } else {
        await getUserById(request, response);
      }
    } else if (method === "DELETE") {
      if (await isAdminOrAuthorizedUser(request, response)) {
        await deleteUserById(request, response);
      } else {
        response.status(401).json({ message: "Forbidden" });
      }
    } else if (method === "PUT") {
      if (await isAdminOrAuthorizedUser(request, response)) {
        await editUser(request, response);
      } else {
        response.status(401).json({ message: "Forbidden" });
      }
    }
  }
);

export default UserById;
