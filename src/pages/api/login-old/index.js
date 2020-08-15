import { withMiddleware } from "utils/apiMiddleware";

export default async (request, response) => {
  await withMiddleware(request, response);
  console.log("Username from login", request.body.username);
  response.status(200).json({ token: "my-token" });
};
