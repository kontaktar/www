import * as types from "../actionTypes";

export function fetchUserExperiences(isServer) {
  return {
    type: types.FETCH_USER_EXPERIENCES_REQUEST,
    yoloswag: isServer
  };
}

export function tickClock(isServer) {
  return {
    type: types.TICK_CLOCK,
    light: !isServer,
    ts: Date.now()
  };
}
