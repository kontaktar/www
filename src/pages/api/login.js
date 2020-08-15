import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/sessions";

// eslint-disable-next-line unicorn/prevent-abbreviations
const login = withSession(async (req, res) => {
  // const { username } = await req.body;
  const { username } = await req.body;
  console.log(username);
  const url = `https://api.github.com/users/einaralex`;
  // const url = `https://api.github.com/users/${username}`;
  console.log("i get here");

  try {
    // we check that the user exists on GitHub and store some data in session
    // const { login, avatar_url: avatarUrl } = await fetchJson(url);
    // const user = { isLoggedIn: true, login: "fake_login_auth" };
    const { login: logg, avatar_url: avatarUrl } = await fetchJson(url);
    const user = {
      isLoggedIn: true,
      login: logg,
      avatarUrl
    };
    req.session.set("user", user);
    req.session.set("password", "123421321321323121212312321sdasdas32");

    try {
      await req.session.save();
      res.json(user);
    } catch (error) {
      console.log("YOOOOO ERRRR", error);
    }
    console.log("here failse");
  } catch (error) {
    console.log("ERROR");
    const { response: fetchResponse } = error;
    res.status((fetchResponse && fetchResponse.status) || 500).json(error.data);
  }
});
export default login;
