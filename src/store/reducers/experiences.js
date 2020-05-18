import * as actionTypes from "../actionTypes";

export const exampleInitialState = {
  todo: 0
};

function experiences(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_EXPERIENCES_REQUEST:
      return {
        ...state,
        ...{ userId: action.payload.userId }
      };

    case actionTypes.FETCH_USER_EXPERIENCES_SUCCESS:
      console.log("state success", state);
      return {
        ...state,
        ...action.payload.experiences
      };

    case actionTypes.FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        ...{ message: action.message }
      };

    default:
      return { ...state };
  }
}

export default experiences;
