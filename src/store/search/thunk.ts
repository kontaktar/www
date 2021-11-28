import { GetSearchResult } from "lib/endpoints";
import { AppThunk } from "../configureStore";

import { searchesSlice } from "./slice";

export const fetchSearchResult =
  (input: string): AppThunk =>
  async (dispatch) => {
    const results = await GetSearchResult(input);
    await dispatch(
      searchesSlice.actions.setSearchResult({
        input: input,
        results: results
      })
    );
  };
