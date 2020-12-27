// import bcrypt from "bcryptjs";
import pgp from "pg-promise";
import { UserSessionStorage } from "types";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import database from "utils/database";

const Register = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const { body: userName } = request;
  try {
    const data = await database.one(
      "SELECT u.id FROM users u WHERE u.user_name=$1",
      userName
    );

    console.log("data", data);
    console.log("data", data);
    console.log("data", data);
    console.log("data", data);
    const user: UserSessionStorage = {
      id: data.id,
      isLoggedIn: true,
      login: userName
    };
    try {
      request.session.set("user", user);
      await request.session.save();
    } catch (error) {
      response.status(500).json(error);
      throw new Error(`Failed to save to session storage`);
    }
    response.json(data.id);
  } catch (error) {
    if (error instanceof pgp.errors.QueryResultError) {
      response.status(404).json({ message: error.message });
      throw new Error(`REGISTER USER 404: ${error}`);
    } else {
      response.status(500).json({ message: error.message });
      throw new Error(`REGISTER USER 500: ${error}`);
    }
  }
});
export default Register;
