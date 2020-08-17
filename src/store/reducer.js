import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import * as reducers from "./reducers";

const otherReducers = combineReducers(reducers);

const rootReducer = (state = { tick: "init" }, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload.server
        }
      };
    case "SERVER_ACTION":
      return {
        ...state,
        server: {
          ...state.server,
          tick: action.payload
        }
      };
    case "CLIENT_ACTION":
      return {
        ...state,
        client: {
          ...state.client,
          tick: action.payload
        }
      };
    default:
      return otherReducers(state, action);
  }
};

export default rootReducer;
