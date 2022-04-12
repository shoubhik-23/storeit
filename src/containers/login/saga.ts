import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { act } from "react-dom/test-utils";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { Constants } from "../../constant";
import { auth, firebaseDB } from "../../firebase/firebase_Config";
import * as actions from "./actions";

const transferLocalCartToOnline = async (uid: any) => {
  const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);

  const firebaseDataBaseRef = collection(firebaseDB, "users");

  const q = query(firebaseDataBaseRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  let onlineCart: any;
  let loggedUser: any;

  querySnapshot.forEach((doc: any) => {
    onlineCart = doc.data()?.cart;
    loggedUser = doc.data();
  });
  if (onlineCart.length == 0) {
    onlineCart = cart.map((el, i) => {
      return { ...el };
    });
  } else if (cart.length == 0) {
    //do nothing
  } else {
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < onlineCart.length; j++) {
        if (cart[i].id == onlineCart[j].id) {
          onlineCart[j].count = cart[i].count + onlineCart[j].count;
        } else {
          console.log(onlineCart, cart[i]);
          const index = onlineCart.findIndex(
            (el: any, ind: number) => el.id == cart[i].id
          );

          index == -1 && onlineCart.push(cart[i]);

          break;
        }
      }
    }
  }
  const washingtonRef = doc(firebaseDB, "users", uid);

  await updateDoc(washingtonRef, {
    cart: onlineCart,
  });
  localStorage.setItem("cart", JSON.stringify([]));
  return loggedUser;
};
const loginWithEmail = async (action?: any) => {
  const email = action.payload.data.email;
  const password = action.payload.data.password;
  try {
    const userCredential: any = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential?.user;
    localStorage.setItem("token", user.accessToken);
    localStorage.setItem("userid", user.uid);

    return await transferLocalCartToOnline(user.uid);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

const signUpWithEmail = async (action?: any) => {
  const email = action.payload.data.email;
  const password = action.payload.data.password;
  try {
    const userCredential: any = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential?.user;
    const docRef = await setDoc(doc(firebaseDB, "users", user?.uid), {
      email: email,
      cart: [],
      address: {
        country: "India",
        state: "Delhi",
        region: "North West",
        fullAddress: "asdfsdf",
      },
      phone: "",
      profilePic: "",
      since: new Date(),
      uid: user?.uid,
      id: user?.uid,
    });

    return docRef;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
function* signUpWorker(action: any): any {
  try {
    yield call(signUpWithEmail, action);

    yield put(actions.loginSuccess());
  } catch (error: any) {
    console.log(error.message);
  }
}
function* loginWorker(action: any): any {
  try {
    const user = yield call(loginWithEmail, action);
    console.log("user", user);

    yield put(actions.loginSuccess(user));
  } catch (error: any) {
    console.log(error.message);
  }
}
export function* loginWatcher() {
  yield takeEvery(Constants.USER_SIGN_UP, signUpWorker);
  yield takeEvery(Constants.USER_LOGIN_IN, loginWorker);
}
