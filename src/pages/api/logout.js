import withSession from "../../lib/sessions";

export default withSession(async (request, response) => {
  request.session.destroy();
  response.json({ isLoggedIn: false });
});
