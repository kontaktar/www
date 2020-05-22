import * as actionType from "store/actionTypes";

function users(state = {}, action) {
  switch (action.type) {
    case actionType.CREATE_USER_REQUEST:
      return {
        ...state
      };
    case actionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        [action.payload.userId]: { ...action.payload.userInfo }
      };
    case actionType.CREATE_USER_FAILURE:
      // TODO:
      return {
        ...state,
        ...{ error: action.message }
      };
    case actionType.EDIT_USER_REQUEST:
      return {
        ...state
      };
    case actionType.EDIT_USER_SUCCESS:
      return {
        ...state,
        [action.payload.userId]: { ...action.payload.userInfo }
      };
    case actionType.EDIT_USER_FAILURE:
      // TODO:
      return {
        ...state,
        ...{ error: action.message }
      };
    case actionType.GET_USER_REQUEST:
      return {
        ...state
      };

    case actionType.GET_USER_SUCCESS:
      return {
        ...state,
        [action.payload.userInfo.id]: { ...action.payload.userInfo }
      };

    case actionType.GET_USER_FAILURE:
      // TODO:
      return {
        ...state,
        ...{ error: action.message }
      };
    default:
      return { ...state };
  }
}

export default users;
