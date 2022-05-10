import { collection, getDocs, query, where } from "firebase/firestore";
import { call, put, takeEvery, delay } from "redux-saga/effects";
import { Constants } from "../../constant";
import { firebaseDB } from "../../firebase/firebase_Config";
import { getLocalCartData, getRemoteCartData } from "../../utils/helpers";
import * as actions from "./actions";
import * as loginActions from "../login/actions";

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
const fetchUserDetails = async (userid: any) => {
  let user: any;
  const userDbRef = collection(firebaseDB, "users");
  const q = query(userDbRef, where("id", "==", userid));
  const userQuerySnapshot = await getDocs(q);

  userQuerySnapshot.forEach((doc: any) => {
    user = doc.data();
  });
  return user;
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

  if (accessToken) {
    const user = yield call(fetchUserDetails, userid);
    yield put(
      actions.retrievingAppStateSuccess({ login: true, userid, userData: user })
    );
    const cart: any[] = yield call(getRemoteCartData, userid);
    yield put(loginActions.fetchCart(cart));
  } else {
    yield put(actions.retrievingAppStateSuccess({ login: false, userid }));
    const cart: any[] = yield call(getLocalCartData);
    yield put(loginActions.fetchCart(cart));
  }
}
export function* homeWatcher() {
  yield takeEvery(Constants.FETCH_ALL_DATA, homeWorker);
  yield takeEvery(Constants.RETRIEVE_APP_STATE, settingAppWorker);
}
