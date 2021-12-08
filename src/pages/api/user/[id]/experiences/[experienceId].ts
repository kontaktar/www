import {
  deleteExperienceById,
  editExperienceById
} from "database/queries/experiences";
import { isAdminOrAuthorizedUser } from "lib/auth";
import { withSession } from "lib/sessions";

export default withSession(async (request, response) => {
  const { method } = request;

  if (
    method === "DELETE" &&
    (await isAdminOrAuthorizedUser(request, response))
  ) {
    await deleteExperienceById(request, response);
  } else if (
    method === "PUT" &&
    (await isAdminOrAuthorizedUser(request, response))
  ) {
    await editExperienceById(request, response);
  }
  response.status(400);
});
