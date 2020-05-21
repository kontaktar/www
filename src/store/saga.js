import { all, fork } from "redux-saga/effects";
import experiences from "./sagas/experiences";
import searches from "./sagas/searches";
import users from "./sagas/users";

export default function* rootSaga() {
  yield all([fork(experiences), fork(searches), fork(users)]);
}
