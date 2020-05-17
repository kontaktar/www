import * as actionTypes from "../actionTypes";

export const exampleInitialState = {
  todo: 0
};

function experiences(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_EXPERIENCES_REQUEST:
      console.log("state inside exp reducer", state);
      console.log("the action", action);
      return {
        ...state,
        ...{ userId: action.payload.userId }
      };

    case actionTypes.FETCH_USER_EXPERIENCES_SUCCESS:
      console.log("state inside exp reducer", state);
      console.log("the action", action);
      return {
        ...state,
        ...{ todo: state.todo - 1 },
        ...{ experiences: action.payload.user }
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
