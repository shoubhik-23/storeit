import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebase_Config";

export const logoutHandler = () => {};
export const getRemoteCartData = async (userid?: any) => {
  const firebaseDataBaseUserRef = collection(firebaseDB, "users");
  const firebaseDataBaseProductRef = collection(firebaseDB, "products");

  let loggedUser: any;

  const q1 = query(firebaseDataBaseUserRef, where("id", "==", userid));
  const userQuerySnapshot = await getDocs(q1);
  userQuerySnapshot.forEach((doc: any) => {
    loggedUser = doc.data();
  });
  let cart: any[] = loggedUser?.cart;
  for (let i in cart) {
    const q2 = query(firebaseDataBaseProductRef, where("id", "==", cart[i].id));
    const querySnapshot = await getDocs(q2);
    let docs: any = {};
    querySnapshot.forEach((doc: any) => {
      docs = doc.data();
    });
    cart[i] = { ...cart[i], ...docs };
  }
  return cart;
};
export const getLocalCartData = async () => {
  let localCart: any[] = JSON.parse(localStorage.getItem("cart") as any);
  const firebaseDataBaseRef = collection(firebaseDB, "products");

  for (let i in localCart) {
    const q = query(firebaseDataBaseRef, where("id", "==", localCart[i].id));
    const querySnapshot = await getDocs(q);
    let docs: any = {};
    querySnapshot.forEach((doc: any) => {
      docs = doc.data();
    });
    localCart[i] = { ...localCart[i], ...docs };
  }
  return localCart;
};
