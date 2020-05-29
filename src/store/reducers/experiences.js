import * as actionType from "store/actionTypes";

function experiences(state = {}, action) {
  switch (action.type) {
    case actionType.FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionType.FETCH_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        byUserId: {
          ...state.byUserId,
          [action.payload.userId]: { ...action.payload.experiences }
        }
      };

    case actionType.FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        ...{ error: action.message }
      };

    default:
      return { ...state };
  }
}

export default experiences;
