const database = require("utils/database").instance;

export default async ({ method }, response) => {
  if (method === "GET") {
    try {
      const get = await database.many("SELECT * FROM experiences;");
      response.status(200).json(get);
    } catch (error) {
      console.error(error);
      response.status(500).end();
    }
  } else {
    response.status(400).end();
  }
};
