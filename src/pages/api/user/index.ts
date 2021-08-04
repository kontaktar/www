import { IronSession } from "types";
import withSession from "lib/sessions";
import { withMiddleware, withUserAccess } from "utils/apiMiddleware";

const User = withSession(async (request, response) => {
  await withMiddleware(request, response);
  // TODO: RESTRICT ACCESS, but how??
  // should check for firebase data and compare it to request.session.get(IronSession.UserSession).firebase.token
  const userData = request.session.get(IronSession.UserSession);
  if (userData) {
    // do we need to fetch any information about the user?
    response.json({
      isLoggedIn: true,
      ...userData
    });
  } else {
    response.json({
      isLoggedIn: false
    });
  }
});

export default User;
