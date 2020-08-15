import withSession from "../../lib/sessions";

const user = withSession(async (request, response) => {
  const userData = request.session.get("user");

  if (userData) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
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

export default user;
