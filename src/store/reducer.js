import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import * as reducers from "./reducers";

const otherReducers = combineReducers(reducers);

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      // eslint-disable-next-line no-param-reassign
      // if (action.payload.app === "init") delete action.payload.app;
      // eslint-disable-next-line no-param-reassign
      // if (action.payload.page === "init") delete action.payload.page;
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload.server
        }
      };

    // case "SERVER_ACTION":
    //   return {
    //     ...state,
    //     server: {
    //       ...state.server,
    //       tick: action.payload
    //     }
    //   };
    // case "CLIENT_ACTION":
    //   return {
    //     ...state,
    //     client: {
    //       ...state.client,
    //       tick: action.payload
    //     }
    //   };
    // case "APP":
    //   return { ...state, app: action.payload };
    // case "PAGE":
    //   return { ...state, page: action.payload };
    default:
      return otherReducers(state, action);
  }
};

export default rootReducer;
