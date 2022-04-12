import { all } from "redux-saga/effects";
import { homeWatcher } from "../containers/home/saga";
import { loginWatcher } from "../containers/login/saga";

function* rootSaga() {
  yield all([homeWatcher(), loginWatcher()]);
}
export default rootSaga;
