import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
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
import { getRemoteCartData } from "../../utils/helpers";

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
const loginWithGoogle = async (action?: any) => {
  let user: any;
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    user = result.user;

    console.log(user);
    const firebaseDataBaseRef = collection(firebaseDB, "users");

    const q = query(firebaseDataBaseRef, where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    let loggedUser: any;

    querySnapshot.forEach((doc: any) => {
      loggedUser = doc.data();
    });
    if (loggedUser) {
    } else {
      const docRef = await setDoc(doc(firebaseDB, "users", user?.uid), {
        email: user?.email,
        cart: [],
        address: {
          country: "India",
          state: "Delhi",
          region: "North West",
          fullAddress: "asdfsdf",
        },
        phone: user?.phoneNumber || "",
        profilePic: user?.photoURL || "",
        since: new Date(),
        uid: user?.uid,
        id: user?.uid,
      });
    }
  } catch (error: any) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential, "error");
  }
  localStorage.setItem("token", user.accessToken);
  localStorage.setItem("userid", user.uid);
  return await transferLocalCartToOnline(user.uid);
};
const loginWithEmail = async (action?: any) => {
  const email = action.payload.data.email;
  const password = action.payload.data.password;
  let user: any;

  try {
    const userCredential: any = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    user = userCredential?.user;
  } catch (error: any) {
    throw new Error(error?.message);
  }

  localStorage.setItem("token", user.accessToken);
  localStorage.setItem("userid", user.uid);
  return await transferLocalCartToOnline(user.uid);
};

async function signUpWithEmail(action?: any) {
  const email = action.payload.data.email;
  const password = action.payload.data.password;
  const type = action.payload.data.type;
  const history = action.payload.history;
  let user: any;
  if (type === "email") {
    try {
      const userCredential: any = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredential?.user;
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
    } catch (error: any) {
      throw new Error(error?.message);
    }
  } else if (type === "google") {
    return await loginWithGoogle();
  }
}
function* signUpWorker(action: any): any {
  if (action.payload.data.type === "email") {
    try {
      yield call(signUpWithEmail, action);

      yield action?.payload?.history.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  } else if (action.payload.data.type === "google") {
    const user = yield call(signUpWithEmail, action);
    const cart = yield call(getRemoteCartData, user.uid);
    yield put(actions.fetchCart(cart));

    yield put(actions.loginSuccess(user));
    yield call(action?.payload?.history.push, "/");
  }
}
function* loginWorker(action: any): any {
  try {
    const user =
      action.payload.data.type === "email"
        ? yield call(loginWithEmail, action)
        : yield call(loginWithGoogle, action);
    const cart = yield call(getRemoteCartData, user.uid);
    yield put(actions.fetchCart(cart));

    yield put(actions.loginSuccess(user));

    yield call(action?.payload?.history.goBack);
  } catch (error: any) {
    console.log(error.message);
  }
}
export function* loginWatcher() {
  yield takeEvery(Constants.USER_SIGN_UP, signUpWorker);
  yield takeEvery(Constants.USER_LOGIN_IN, loginWorker);
}
