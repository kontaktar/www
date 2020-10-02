import { withMiddleware } from "utils/apiMiddleware";
import withSession from "../../lib/sessions";

const login = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const { username } = await request.body;

  // TODO: Need to validate if user actually exists

  try {
    const user = {
      isLoggedIn: true,
      login: username
    };

    console.log("setting to session: user", user);
    request.session.set("user", user);

    try {
      await request.session.save();
      response.json(user);
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status((fetchResponse && fetchResponse.status) || 500).json(error.data);
  }
});
export default login;
