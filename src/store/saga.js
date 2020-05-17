import { all, call, delay, put, take } from "redux-saga/effects";

import { tickClock } from "./actions/experiences";
import * as actionTypes from "./actionTypes";

function* runClockSaga() {
  yield take(actionTypes.FETCH_USER_EXPERIENCES_REQUEST);
  yield delay(1000);
  yield put(tickClock(false));
  // while (true) {
  //   yield delay(1000);
  //   yield put(tickClock(false));
  // }
}

// function* loadDataSaga() {
//   try {
//     const res = yield fetch("https://jsonplaceholder.typicode.com/users");
//     const data = yield res.json();
//     yield put(loadDataSuccess(data));
//   } catch (error) {
//     // yield put(failure(error));
//   }
// }

function* rootSaga() {
  yield all([
    call(runClockSaga)
    // takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  ]);
}

export default rootSaga;
