import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";

const pgp = require("pg-promise");
const bcrypt = require("bcrypt");
const database = require("utils/database").instance;

const login = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const { body, method } = request;
  if (method === "POST") {
    const { userName, password } = body;
    try {
      const data = await database.one(
        "SELECT u.password FROM users u WHERE u.user_name=$1",
        userName
      );

      const passwordMatches = await bcrypt.compare(password, data.password);
      if (passwordMatches) {
        // Add to sessionStorage
        const user = {
          isLoggedIn: true,
          login: userName
        };
        request.session.set("user", user);

        try {
          await request.session.save();
          response.json(user);
        } catch (error) {
          console.error("Failed to save session:", error);
        }
      } else {
        response.status(404).json({ message: "Incorrect password" });
      }
    } catch (error) {
      if (error instanceof pgp.errors.QueryResultError) {
        response.status(404).json({ message: error.message });
        throw new Error(error.message);
      } else {
        response.status(500).json({ message: error.message });
        throw new Error("LOGIN USER 500: ", error);
      }
    }
  }
});
export default login;
