import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";

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
    response
      .status((fetchResponse && fetchResponse.status) || 500)
      .json(error.data);
  }
});
export default login;
