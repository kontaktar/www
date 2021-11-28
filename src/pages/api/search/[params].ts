import prisma from "database";
import { searchWithParams } from "database/queries/search";
import type { NextApiHandler } from "next";
const SearchWithParams = async (request, response): Promise<void> => {
  const {
    method,
    query: { params }
  } = request;
  if (method === "GET") {
    await searchWithParams(request, response);
  }
};
export default SearchWithParams;
