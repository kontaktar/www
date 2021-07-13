// ./pages/api/login
import { setAuthCookies } from "next-firebase-auth";
import { IronSession, UserSessionStorage } from "types";
import withSession from "lib/sessions";
import { withMiddleware } from "utils/apiMiddleware";
import { debugError } from "helpers/debug";
import initAuth from "../../lib/initAuth";

initAuth();

const Login = withSession(async (request, response) => {
  await withMiddleware(request, response);
  const { body } = request;
  try {
    if (
      process.env.NEXT_PUBLIC_BYPASS_FIREBASE !== "1" &&
      process.env.NODE_ENV !== "development"
    ) {
      // bypass firebase on localhost
      try {
        await setAuthCookies(request, response);
      } catch (error) {
        debugError(`setAuthCookies: ${error.message}`);
        return response
          .status(500)
          .json({ error: `setAuthCookies: ${error.message}` });
      }
    }

    const user: UserSessionStorage = {
      id: body.id,
      isLoggedIn: true,
      login: body.userName
    };

    try {
      request.session.set(IronSession.Name, user);
      await request.session.save();
    } catch (error) {
      response.status(500).json(error);
      debugError(`setting to iron: ${error.message}`);
      throw new Error(`Failed to save to session storage`);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
  return response.status(200).json(body);
});

export default Login;
