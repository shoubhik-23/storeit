import { collection, getDocs } from "firebase/firestore";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import { Constants } from "../../constant";
import { firebaseDB } from "../../firebase/firebase_Config";
import * as actions from "./actions";

const loadAllData = async () => {
  const firebaseDataBaseRef = collection(firebaseDB, "products");
  try {
    let fetchedDocs = [];
    const result = await getDocs(firebaseDataBaseRef);
    const getDocsArray = result.docs;
    fetchedDocs = getDocsArray.map((el, i) => {
      return {
        ...el.data(),
      };
    });
    return fetchedDocs;
  } catch (error) {}
};
function* homeWorker(): any {
  try {
    let data = yield call(loadAllData);
    yield put(actions.fetchProductsSuccess(data));
  } catch (error) {}
}
function* settingAppWorker(): any {
  if (!window.localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  let accessToken = window.localStorage.getItem("token");
  let userid = window.localStorage.getItem("userid");
  accessToken
    ? yield put(actions.retrievingAppStateSuccess({ login: true, userid }))
    : yield put(actions.retrievingAppStateSuccess({ login: false, userid }));
}
export function* homeWatcher() {
  yield takeEvery(Constants.FETCH_ALL_DATA, homeWorker);
  yield takeEvery(Constants.RETRIEVE_APP_STATE, settingAppWorker);
}
