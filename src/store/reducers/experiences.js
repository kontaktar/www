import * as actionTypes from "../actionTypes";

export const exampleInitialState = {
  todo: 0
};

function experiences(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_EXPERIENCES_REQUEST:
      console.log("state inside exp reducer", state);
      return {
        ...state,
        ...{ todo: state.todo + 1 }
      };

    case actionTypes.FETCH_USER_EXPERIENCES_SUCCESS:
      return {
        ...state,
        ...{ todo: state.todo - 1 }
      };

    case actionTypes.FETCH_USER_EXPERIENCES_FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    default:
      return state;
  }
}

export default experiences;
