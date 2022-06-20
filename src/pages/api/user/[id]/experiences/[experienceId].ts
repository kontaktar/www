import {
  deleteExperienceById,
  editExperienceById
} from "database/queries/experiences";
import { isAdminOrAuthorizedUser } from "lib/auth";
import { withSession } from "lib/sessions";

export default withSession(async (request, response) => {
  const { method } = request;

  if (method === "DELETE") {
    if (await isAdminOrAuthorizedUser(request, response)) {
      await deleteExperienceById(request, response);
    } else {
      response.status(401).json({ message: "Forbidden" });
    }
  } else if (method === "PUT") {
    if (await isAdminOrAuthorizedUser(request, response)) {
      await editExperienceById(request, response);
    } else {
      response.status(401).json({ message: "Forbidden" });
    }
  }
  response.status(400);
});
