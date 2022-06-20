// ./pages/api/login
import { UserSessionStorage } from "types";
import { checkAuthHeader } from "lib/auth";
import { withSession } from "lib/sessions";
import { saveUserToSession } from "lib/sessions";
import { debugError } from "helpers/debug";

const Login = withSession(async (request, response) => {
  const { body } = request;
  try {
    const user: UserSessionStorage = {
      details: body,
      isLoggedIn: true,
      firebase: {
        token: request.headers.authorization
      }
    };
    await saveUserToSession(request, response, user);

    response.status(200).json(body);
    
  } catch (error) {
    debugError(error);
    // response.status(400).json(body);
    return;
  }
});

export default Login;
