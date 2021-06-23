import { unsetAuthCookies } from "next-firebase-auth";
import withSession from "lib/sessions";
import initAuth from "../../lib/initAuth"; // the module you created above

initAuth();

const Logout = withSession(async (request, response) => {
  try {
    await request.session.destroy();
    await unsetAuthCookies(request, response);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
  return response.status(200).json({ isLoggedIn: false });
});

export default Logout;
