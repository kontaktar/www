import pgp from "pg-promise";
import withSession from "lib/sessions";
import { withMiddleware, withUserAccess } from "utils/apiMiddleware";
import database from "utils/database";
import { debugError } from "helpers/debug";
import { removeEmpty } from "helpers/objects";

const { helpers: pgpHelpers } = pgp({ capSQL: true });

export default withSession(
  withUserAccess(async (request, response) => {
    withMiddleware(request, response);

    const {
      body,
      method,
      query: { experienceId, id: userId }
    } = request;

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
          debugError(`DELETE EXPERIENCE 404: ${error}`);
        } else {
          response.status(500).end();
          throw new Error(`DELETE EXPERIENCE 500: ${error}`);
        }
      }
    } else if (method === "PUT") {
      const {
        id,
        title = null,
        description = null,
        years = null,
        months = null,
        published = false,
        order = null
      } = body;

      const experienceVariablesToUpdate = removeEmpty({
        id,
        title,
        description,
        years,
        months,
        published,
        order
      });

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
          throw new Error(`UPDATE EXPERIENCE 404: ${error}`);
        } else {
          response.status(500).end();
          throw new Error(`UPDATE USER 500: ${error}`);
        }
      }
    } else {
      response.status(400).end();
    }
    return null;
  })
);
