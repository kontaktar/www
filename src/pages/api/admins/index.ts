import { getIsAdmin } from "database/queries/admins";
import { withSession } from "lib/sessions";

const GetAdmins = withSession(async (request, response) => {
  const {
    method,
    query: { phoneNumber, id }
  } = request;
  if (method === "GET" && phoneNumber && id) {
    await getIsAdmin(request, response);
  } else {
    response.status(404).json({ message: "Not found" });
  }
});

export default GetAdmins;
