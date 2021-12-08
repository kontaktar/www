import {
  createUserExperience,
  editUserExperiencesOrder,
  getUserExperiences
} from "database/queries/experiences";
import { isAdminOrAuthorizedUser } from "lib/auth";
import { withSession } from "lib/sessions";

export default withSession(async (request, response) => {
  const { method } = request;
  if (method === "GET") {
    await getUserExperiences(request, response);
  } else if (
    method === "POST" &&
    (await isAdminOrAuthorizedUser(request, response))
  ) {
    await createUserExperience(request, response);
  } else if (
    method === "PUT" &&
    (await isAdminOrAuthorizedUser(request, response))
  ) {
    await editUserExperiencesOrder(request, response);
  } else {
    response.status(400).json();
  }
});
