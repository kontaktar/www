import { deleteUserById, editUser, getUserById } from "database/queries/user";
import * as admin from "firebase-admin";
import type { NextApiResponse } from "next";
import type { NextIronRequest } from "types";
import { isAdminOrCurrentUser } from "lib/auth";
import { firebaseAdminInitConfig } from "lib/firebaseConfig";
import { withSession } from "lib/sessions";
import { debugError } from "helpers/debug";

const UserById = withSession(
  async (request: NextIronRequest, response: NextApiResponse) => {
    const { method } = request;
    if (method === "GET") {
      await getUserById(request, response);
    } else if (
      method === "DELETE" &&
      (await isAdminOrCurrentUser(request, response))
    ) {
      await deleteUserById(request, response);
    } else if (
      method === "PUT" &&
      (await isAdminOrCurrentUser(request, response))
    ) {
      await editUser(request, response);
    }
  }
);

export default UserById;
