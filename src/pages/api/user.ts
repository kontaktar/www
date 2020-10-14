import withSession from "lib/sessions";

const User = withSession(async (request, response) => {
  const userData = request.session.get("user");
  const { method } = request;
  if (method === "GET") {
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
  } else {
    response.status(400).end();
  }
});

export default User;
