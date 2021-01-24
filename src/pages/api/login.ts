import bcrypt from "bcryptjs";
import pgp from "pg-promise";
import { UserSessionStorage } from "types";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import database from "utils/database";
import { loginErrors } from "helpers/errorMessages";

const Login = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const { body } = request;
  const { userName, password } = body;
  try {
    const data = await database.one(
      "SELECT u.id, u.password FROM users u WHERE u.user_name=$1",
      userName
    );

    const passwordMatches = await bcrypt.compare(password, data.password);
    if (passwordMatches) {
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

      response.json(user);
    } else {
      response.status(404).json({ message: loginErrors.NO_MATCH });
    }
  } catch (error) {
    if (error instanceof pgp.errors.QueryResultError) {
      let message;
      if (error.message === "No data returned from the query.") {
        message = loginErrors.NO_MATCH;
      }
      response.status(404).json({ message });
      throw new Error(`LOGIN USER 404: ${error}`);
    } else {
      response.status(500).json({ message: error.message });
      throw new Error(`LOGIN USER 500: ${error}`);
    }
  }
});
export default Login;
