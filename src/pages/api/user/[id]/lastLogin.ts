import { editUserLastLoginById } from "database/queries/user";
import { isAdminOrAuthorizedUser } from "lib/auth";
import { withSession } from "lib/sessions";
const UpdateUserLastLoginById = withSession(async (request, response) => {
  const { body, method } = request;

  if (method === "PUT" && (await isAdminOrAuthorizedUser(request, response))) {
    if (body && body.lastLogin) {
      await editUserLastLoginById(request, response);
    }
  } else {
    response.status(404);
  }
});

export default UpdateUserLastLoginById;
