import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import * as reducers from "./reducers";

const otherReducers = combineReducers(reducers);

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload.server
        }
      };

    default:
      return otherReducers(state, action);
  }
};

export default rootReducer;
