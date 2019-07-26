export default (request, response) => {
  console.log(request.body.username);
  response.status(200).json({ token: "my-token" });
};
