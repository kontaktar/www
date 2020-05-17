// eslint-disable-next-line no-unused-vars
import { all, call, delay, put, take, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actionTypes";
import { tickClock } from "../actions/experiences";
import { GetExperiencesByUserId } from "../../pages/api/endpoints";

function* fetchExperiencesByUserId(action) {
  console.log("STATE STORE, IS THIS SOMETHIENG??-------", action);
  // yield take(actionTypes.FETCH_USER_EXPERIENCES_REQUEST);
  //
  yield delay(1000);
  yield put(tickClock(false));

  try {
    const user = yield call(GetExperiencesByUserId, action.payload.userId);
    yield put({ type: actionTypes.FETCH_USER_EXPERIENCES_SUCCESS, user });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_USER_EXPERIENCES_FAILURE,
      message: error.message
    });
  }
}

function* experiences() {
  yield all([
    takeEvery(
      actionTypes.FETCH_USER_EXPERIENCES_REQUEST,
      fetchExperiencesByUserId
    )
  ]);
}

export default experiences;
