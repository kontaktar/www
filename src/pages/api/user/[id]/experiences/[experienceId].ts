import {
  deleteExperienceById,
  editExperienceById
} from "database/queries/experiences";
import { isAdminOrCurrentUser } from "lib/auth";
import { withSession } from "lib/sessions";

export default withSession(async (request, response) => {
  const { method } = request;

  if (method === "DELETE" && (await isAdminOrCurrentUser(request, response))) {
    await deleteExperienceById(request, response);
  } else if (
    method === "PUT" &&
    (await isAdminOrCurrentUser(request, response))
  ) {
    await editExperienceById(request, response);
  }
  response.status(400);
});
