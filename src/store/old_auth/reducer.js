import * as ACTION_TYPES from "./actionTypes";

export const initialState = {
  is_authenticated: false
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        is_authenticated: true
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        is_authenticated: false
      };
    // case ACTION_TYPES.FAILURE:
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
};
