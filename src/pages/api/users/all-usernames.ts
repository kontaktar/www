import pgp from "pg-promise";
import { NextApiHandler } from "next";
import { UserDB } from "types";
import { withMiddleware } from "utils/apiMiddleware";
import database from "utils/database";

const AllUserNames: NextApiHandler = async (request, response) => {
  await withMiddleware(request, response);
  const { method } = request;
  if (method === "GET") {
    try {
      const data = await database.many("SELECT u.user_name FROM users u;");
      response.status(200).json(data.map((d: UserDB) => d.user_name));
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).json({ message: error.message });
      } else {
        response.status(500).json({ message: error.message });
      }
    }
  }
};

export default AllUserNames;
