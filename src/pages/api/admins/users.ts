import { getAllUsers } from "database/queries/users";
import type { NextApiResponse } from "next";
import type { NextIronRequest } from "types";
import { isAdmin } from "lib/auth";
import { withSession } from "lib/sessions";

export default withSession(
  async (request: NextIronRequest, response: NextApiResponse) => {
    const { method } = request;
    if (method === "GET") {
      if (await isAdmin(request)) {
        await getAllUsers(request, response);
      } else {
        response.status(401).json({ message: "Forbidden" });
      }
    } else {
      response.status(404).json({ message: "Not found" });
    }
  }
);
