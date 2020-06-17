import * as actionType from "store/actionTypes";

function auth(state = {}, action) {
  switch (action.type) {
    case actionType.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: action.payload.userInfo
      };

    case actionType.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        user: null,
        ...{ error: action.message }
      };
    default:
      return { ...state };
  }
}

export default auth;
