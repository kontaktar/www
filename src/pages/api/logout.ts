import withSession from "lib/sessions";

const Logout = withSession(async (request, response) => {
  // request.session.destroy();
  await request.session.destroy();
  response.json({ isLoggedIn: false });
});
export default Logout;
