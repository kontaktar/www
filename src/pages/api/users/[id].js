const database = require("../../../utils/database").instance;

export default async (request, response) => {
  try {
    const {
      query: { id }
    } = request;
    const post = await database.one("SELECT * FROM users WHERE id=$1", id);
    response.status(200).json(post);
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
};
