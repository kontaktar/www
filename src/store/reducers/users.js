import * as actionType from "store/actionTypes";

function users(state = {}, action) {
  switch (action.type) {
    case actionType.CREATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        [action.payload.userId]: { ...action.payload.userInfo }
      };
    case actionType.CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };
    case actionType.EDIT_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionType.EDIT_USER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        [action.payload.userId]: { ...action.payload.userInfo }
      };
    case actionType.EDIT_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };
    case actionType.FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        [action.payload.userInfo.id]: { ...action.payload.userInfo }
      };

    case actionType.FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };
    default:
      return { ...state };
  }
}

export default users;
