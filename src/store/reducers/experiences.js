import * as actionType from "store/actionTypes";

export const initialState = {
  experiences: {}
};

function experiences(state = initialState, action) {
  switch (action.type) {
    case actionType.FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        ...{ userId: action.payload.userId }
      };

    case actionType.FETCH_USER_EXPERIENCES_SUCCESS:
      console.log("state success", state);
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
