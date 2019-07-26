export default (request, response) => {
  const data = {
    name: "Einar",
    bio: "I like computers",
  };
  response.status(200).json(JSON.stringify(data));
};
