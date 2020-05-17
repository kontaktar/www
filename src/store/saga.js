import { all, fork } from "redux-saga/effects";
import experiences from "./sagas/experiences";

// import * as actionTypes from "./actionTypes";

// function* runClockSaga() {
//   yield take(actionTypes.FETCH_USER_EXPERIENCES_REQUEST);
//   yield delay(1000);
//   yield put(tickClock(false));
//   // while (true) {
//   //   yield delay(1000);
//   //   yield put(tickClock(false));
//   // }
// }

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
    // call(runClockSaga),
    fork(experiences)
    // takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  ]);
}

// takeLatest er t.d. gott fyrir search myndi ég halda, cancellar öllum previous saga tasks sem eru enn að keyra,

export default rootSaga;
