import { getAllUsernames } from "database/queries/users";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (request, response) => {
  const { method } = request;
  if (method === "GET") {
    await getAllUsernames(request, response);
  } else {
    response.status(404).json({ message: "Not found" });
  }
};

export default handler;
