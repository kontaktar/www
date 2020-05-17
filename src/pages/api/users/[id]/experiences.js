const database = require("utils/database").instance;

export default async ({ query: { id } }, response) => {
  try {
    const post = await database.any(
      "SELECT e.id, e.title, e.description, e.years, e.months FROM experiences e LEFT JOIN users u ON e.user_id = u.id WHERE u.id = $1",
      id
    );
    response.status(200).json(post);
  } catch (error) {
    console.error(error);
    response.status(500).end();
  }
};
