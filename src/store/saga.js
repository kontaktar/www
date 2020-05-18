import { all, fork } from "redux-saga/effects";
import experiences from "./sagas/experiences";

export default function* rootSaga() {
  yield all([fork(experiences)]);
}
