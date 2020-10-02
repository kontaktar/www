import { withMiddleware } from "utils/apiMiddleware";
import withSession from "../../lib/sessions";

// eslint-disable-next-line unicorn/prevent-abbreviations
const login = withSession(async (req, res) => {
  await withMiddleware(req, res);
  const { username } = await req.body;

  // TODO: Need to validate if user actually exists

  try {
    const user = {
      isLoggedIn: true,
      login: username
    };

    console.log("setting to session: user", user);
    req.session.set("user", user);

    try {
      await req.session.save();
      res.json(user);
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status((fetchResponse && fetchResponse.status) || 500).json(error.data);
  }
});
export default login;
