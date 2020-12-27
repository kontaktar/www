import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import * as reducers from "./reducers";

const otherReducers = combineReducers(reducers);

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      // Because server overwrites client, some of it we wan't to keep.
      return {
        experiences: {
          byUserId: {
            ...state.experiences.byUserId,
            ...action.payload.experiences
          },
          ...state.experiences,
          ...action.payload.experiences
        },
        users: {
          ...state.users,
          ...action.payload.users
        },
        searches: {
          inputs: {
            ...state.searches.inputs,
            ...action.payload.searches.inputs
          },
          ...state.searches,
          ...action.payload.searches
        }
      };
    default:
      return otherReducers(state, action);
  }
};

export default rootReducer;
