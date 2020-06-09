import * as actionType from "store/actionTypes";

function auth(state = {}, action) {
  switch (action.type) {
    case actionType.FETCH_USER_BY_USER_NAME_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.FETCH_USER_BY_USER_NAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: action.payload.userInfo
      };

    case actionType.FETCH_USER_BY_USER_NAME_FAILURE:
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
