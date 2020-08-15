// import withSession from "../../lib/session";
// import fetchJson from "../../lib/fetchJson";

// // TODO: Remove, just here for reference
// // eslint-disable-next-line unicorn/prevent-abbreviations
// export default withSession(async (request, res) => {
//   const user = request.session.get("user");

//   if (user && !user.isLoggedIn) {
//     res.status(401).end();
//     return;
//   }

//   const url = `https://api.github.com/users/${user.login}/events`;

//   try {
//     // we check that the user exists on GitHub and store some data in session
//     const events = await fetchJson(url);
//     res.json(events);
//   } catch (error) {
//     const { response: fetchResponse } = error;
//     res.status((fetchResponse && fetchResponse.status) || 500).json(error.data);
//   }
// });
