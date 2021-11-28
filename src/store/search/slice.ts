import { createSlice } from "@reduxjs/toolkit";

export const searchesSlice = createSlice({
  name: "searches",
  initialState: {} as any,
  reducers: {
    setSearchResult(state, action) {
      return {
        latestInput: action.payload.input || "",
        inputs: {
          ...state.inputs,
          ...{
            [action.payload?.input || ""]: {
              ...action.payload?.results
            }
          }
        }
      };
    },

    updateLatestSearch(state, action) {
      return {
        ...state,
        latestInput: action.payload
      };
    }
  }
});

const { updateLatestSearch } = searchesSlice.actions;
export { updateLatestSearch };
