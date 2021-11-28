import { IronSession, UserSessionStorage } from "types";
import { checkAuthHeader } from "lib/auth";
import { saveUserToSession, withSession } from "lib/sessions";
import { debugError } from "helpers/debug";

const AddToSession = withSession(async (request, response) => {
  const { body } = request;

  const userSession = request.session.get(IronSession.UserSession);
  const user: UserSessionStorage = {
    isLoggedIn: false, // this is only used to update user before registration, therefore isLoggedIn set to false.
    ...userSession,
    details: {
      ...userSession?.details,
      ...body?.details
    },
    firebase: {
      ...userSession?.firebase,
      ...body?.firebase,
      token: request.headers.authorization
    }
  };

  try {
    await checkAuthHeader(request, response, user);
  } catch (error) {
    debugError("session:", error);
    return;
  }

  await saveUserToSession(request, response, user);

  response.status(200).json(user);
});

export default AddToSession;
