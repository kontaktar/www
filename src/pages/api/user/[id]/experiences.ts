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
  } else if (method === "POST") {
    if (await isAdminOrAuthorizedUser(request, response)) {
      await createUserExperience(request, response);
    } else {
      response.status(401).json({ message: "Forbidden" });
    }
  } else if (method === "PUT") {
    if (await isAdminOrAuthorizedUser(request, response)) {
      await editUserExperiencesOrder(request, response);
    } else {
      response.status(401).json({ message: "Forbidden" });
    }
  }
  response.status(400).json({ message: "Forbidden" });
});
