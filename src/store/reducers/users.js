import * as actionType from "store/actionTypes";

function users(state = {}, action) {
  switch (action.type) {
    case actionType.CREATE_USER_REQUEST:
      return {
        ...state,
        userInfo: { ...action.payload.userInfo }
      };

    case actionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload.userId // ?
      };

    case actionType.CREATE_USER_FAILURE:
      return {
        ...state,
        ...{ error: action.message }
      };

    default:
      return { ...state };
  }
}

export default users;
