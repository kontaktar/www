import * as types from "../actionTypes";

export function fetchUserExperiences(userId) {
  return {
    type: types.FETCH_USER_EXPERIENCES_REQUEST,
    payload: {
      userId
    }
  };
}

export function tickClock(isServer) {
  return {
    type: types.TICK_CLOCK,
    light: !isServer,
    ts: Date.now()
  };
}
