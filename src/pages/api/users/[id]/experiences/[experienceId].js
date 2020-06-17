import { withMiddleware } from "utils/apiMiddleware";
import { removeEmpty } from "helpers/objects";

const pgp = require("pg-promise");
const database = require("utils/database").instance;

const { helpers: pgpHelpers } = pgp({ capSQL: true });

export default async (request, response) => {
  await withMiddleware(request, response);
  const {
    body,
    method,
    query: { experienceId, id: userId }
  } = request;
  if (method === "GET") {
    // I don't think this one is needed
    try {
      const get = await database.one(
        "SELECT e.id, e.title, e.description, e.years, e.months, e.published FROM experiences e WHERE e.id = $1 AND e.user_id = $2",
        experienceId,
        userId
      );
      response.status(200).json(get);
    } catch (error) {
      response.status(500).end();
      throw new Error(error);
    }
  }

  if (method === "DELETE") {
    try {
      await database.one(
        "DELETE FROM experiences WHERE user_id = $1 AND id = $2 RETURNING *;",
        [userId, experienceId]
      );
      response.status(200).json({ userId, experienceId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).end();
        throw new Error("DELETE EXPERIENCE 404: ", error);
      } else {
        response.status(500).end();
        throw new Error("DELETE EXPERIENCE 500: ", error);
      }
    }
  }
  if (method === "PUT") {
    // I wish this was typescript
    const {
      id,
      title = null,
      description = null,
      years = null,
      months = null,
      published = false
    } = body;

    const experienceVariables = {
      id,
      title,
      description,
      years,
      months,
      published
    };

    const experienceVariablesToUpdate = removeEmpty(experienceVariables);

    try {
      const query = pgpHelpers.update(
        experienceVariablesToUpdate,
        null,
        "experiences"
      );
      const condition = pgp.as.format(
        " WHERE id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
      );

      const experience = await database.one(query + condition);
      response.status(200).json(experience);
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).end();
        throw new Error("UPDATE EXPERIENCE 404: ", error);
      } else {
        response.status(500).end();
        throw new Error("UPDATE USER 500: ", error);
      }
    }
  } else {
    response.status(400).end();
  }
};
