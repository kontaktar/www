import { all, fork } from "redux-saga/effects";
import experiences from "./sagas/experiences";
import searches from "./sagas/searches";

export default function* rootSaga() {
  yield all([fork(experiences), fork(searches)]);
}
