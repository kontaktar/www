import { searchAll } from "database/queries/search";

const SearchAll = async (request, response): Promise<void> => {
  const { method } = request;
  if (method === "GET") {
    await searchAll(request, response);
  } else {
    response.status(404).json({ message: "Not found" });
  }
};

export default SearchAll;
