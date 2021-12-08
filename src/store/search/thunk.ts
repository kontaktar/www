import { GetSearchResult } from "lib/endpoints";
import { randomize } from "helpers/arrays";
import { AppThunk } from "../configureStore";

import { searchesSlice } from "./slice";

export const fetchSearchResult =
  (input: string): AppThunk =>
  async (dispatch) => {
    const results = await GetSearchResult(input);
    await dispatch(
      searchesSlice.actions.setSearchResult({
        input: input,
        results: randomize(results)
      })
    );
  };
