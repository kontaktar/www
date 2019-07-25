export default (request, response) => {
  const data = {
    name: "test",
    login: "something",
    bio: "something",
    avatarUrl: "lel",
  };
  response.status(200).json(JSON.stringify(data));
};
