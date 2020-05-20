import * as actionType from "store/actionTypes";

export const initialState = {
  experiences: {}
};

// TODO: shape the final object better
// store should keep all expirences by userIds

function experiences(state = initialState, action) {
  switch (action.type) {
    case actionType.FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        ...{ userId: action.payload.userId }
      };

    case actionType.FETCH_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        ...action.payload.experiences
      };

    case actionType.FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        ...{ error: action.message }
      };

    default:
      return { ...state };
  }
}

export default experiences;
