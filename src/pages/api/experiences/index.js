import { withMiddleware } from "utils/apiMiddleware";

const database = require("utils/database").instance;

export default async (request, response) => {
  await withMiddleware(request, response);
  const { method } = request;
  if (method === "GET") {
    try {
      const get = await database.many("SELECT * FROM experiences;");
      response.status(200).json(get);
    } catch (error) {
      response.status(500).end();
      throw new Error(error);
    }
  } else {
    response.status(400).end();
  }
};
