/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { removeEmpty } from "helpers/objects";

const pgp = require("pg-promise");
const database = require("utils/database").instance;

const { helpers: pgpHelpers } = pgp({ capSQL: true });

export default async (
  { body, method, query: { experienceId, id: userId } },
  response
) => {
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
      console.error(error);
      response.status(500).end();
    }
  }

  if (method === "DELETE") {
    try {
      await database.one(
        "DELETE FROM experiences WHERE user_id = $1 AND id = $2 RETURNING *;",
        [userId, experienceId]
      );
      response.status(200).json({ userId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        console.error("DELETE EXPERIENCE 404: ", error);
        response.status(404).end();
      } else {
        console.error("DELETE EXPERIENCE 500: ", error);
        response.status(500).end();
      }
    }
  }
  if (method === "PUT") {
    // I wish this was typescript
    const {
      title = null,
      description = null,
      years = null,
      months = null,
      published = null
    } = body;

    const experienceVariables = {
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
        [experienceId, userId]
      );

      await database.one(query + condition);

      response.status(200).json({ experienceId });
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        console.error("UPDATE USER 404: ", error);
        response.status(404).end();
      } else {
        console.error("UPDATE USER 500: ", error);
        response.status(500).end();
      }
    }
  } else {
    response.status(400).end();
  }
};
