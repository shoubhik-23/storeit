import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { Container, Grid, Paper, Divider, Switch, Input } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import css from "./style.module.css";
import { firebaseDB } from "../../firebase/firebase_Config";
import ImageCard from "../../components/ImageCard";
import Colors from "../../utils/colors";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Images } from "../../utils/Images";
import { Box } from "@mui/system";
import { CartLoader } from "./CartLoader";
import * as actions from "../login/actions";
import moment from "moment";
import CheckoutDialog from "./CheckoutDialog";
import "./style.css";
import Modal from "./Modal";
const CartComponent = () => {
  const history = useHistory();
  const store: any = useSelector((state) => state);
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [dialogueopen, setDialogueopen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const dispatch = useDispatch();
  const { login, userid }: any = store.profile;
  console.log(store.profile);
  const [cartData, setCartData] = useState<any[]>([]);
  useEffect(() => {
    login ? getRemoteCartData() : getLocalCartData();
  }, [login]);

  const getRemoteCartData = async () => {
    const firebaseDataBaseUserRef = collection(firebaseDB, "users");
    const firebaseDataBaseProductRef = collection(firebaseDB, "products");

    let loggedUser: any;

    const q1 = query(firebaseDataBaseUserRef, where("id", "==", userid));
    const userQuerySnapshot = await getDocs(q1);
    userQuerySnapshot.forEach((doc: any) => {
      loggedUser = doc.data();
      setUserData({
        ...doc.data(),
      });
    });
    let cart: any[] = loggedUser?.cart;
    for (let i in cart) {
      const q2 = query(
        firebaseDataBaseProductRef,
        where("id", "==", cart[i].id)
      );
      const querySnapshot = await getDocs(q2);
      let docs: any = {};
      querySnapshot.forEach((doc: any) => {
        docs = doc.data();
      });
      cart[i] = { ...cart[i], ...docs };
    }
    setCartData(cart);
    dispatch(actions.fetchCart(cart));

    setLoading(false);
  };
  const getLocalCartData = async () => {
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
    setCartData(localCart);
    dispatch(actions.fetchCart(localCart));
    setLoading(false);
  };
  const updateRemoteCart = async (uid: any, updatedCart: any[]) => {
    const cart: any[] = [...updatedCart];

    const washingtonRef = doc(firebaseDB, "users", uid);

    await updateDoc(washingtonRef, {
      cart: cart,
    });
  };
  const deleteItemFromCart = async (item: any, e: any) => {
    e.stopPropagation();

    if (login) {
      const index = cartData.findIndex((el) => el.id === item.id);

      let temp: any[] = [...cartData];

      temp.splice(index, 1);
      await updateRemoteCart(userid, temp);

      setCartData(temp);
      dispatch(actions.fetchCart(temp));
    } else {
      const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
      const index = cart.findIndex((el) => el.id === item.id);

      let temp = [...cartData];
      temp.splice(index, 1);

      setCartData(temp);
      dispatch(actions.fetchCart(temp));

      localStorage.setItem("cart", JSON.stringify(temp));
    }
  };
  const priceCalculation: any = useCallback((cart: any, type?: string) => {
    let total: any;
    let temp: any = cart.map((el: any, i: any) => {
      return {
        totalAmount: parseFloat(el.discount) * parseFloat(el.count),
        price: parseFloat(el.price) * parseFloat(el.count),
        discount:
          parseFloat(el.price) * parseFloat(el.count) -
          parseFloat(el.discount) * parseFloat(el.count),
      };
    });
    switch (type) {
      case "amount": {
        total = temp.reduce(
          (acc: any, el: any) => acc + parseFloat(el.totalAmount),
          0
        );
        break;
      }
      case "price":
        {
          total = temp.reduce(
            (acc: any, el: any) => acc + parseFloat(el.price),
            0
          );
        }
        break;
      case "discount": {
        total = temp.reduce(
          (acc: any, el: any) => acc + parseFloat(el.discount),
          0
        );
      }
    }
    return total;
  }, []);
  const addToCart = async (item: any, e?: any) => {
    e.stopPropagation();

    if (login) {
      const cart: any[] = [...cartData];
      const index = cart.findIndex((el) => el.id === item.id);
      if (index == -1) {
        cart.push({ id: item.id, count: 1 });
      } else {
        cart[index] = { ...cart[index], count: cart[index].count + 1 };
      }

      await updateRemoteCart(userid, cart);
      setCartData(cart);
      dispatch(actions.fetchCart(cart));
    } else {
      const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
      const index = cart.findIndex((el) => el.id === item.id);
      if (index == -1) {
        cart.push({ id: item.id, count: 1 });
      } else {
        cart[index] = { ...cart[index], count: cart[index].count + 1 };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      let temp = cartData.map((el: any, i: number, arr: any[]) => {
        return { ...el, count: cart[i].count };
      });
      setCartData(temp);
      dispatch(actions.fetchCart(temp));
    }
  };
  const placeOrderHandler = async () => {
    const orderRef = collection(firebaseDB, "orders");
    let order: any;
    let temp: any[] = cartData.map((el: any, i: number) => {
      return { count: el.count, id: el.id };
    });
    order = {
      userid,
      items: temp,
      date: moment(new Date()).format(),
    };
    try {
      const docs = await doc(orderRef);
      const docRef = await setDoc(docs, {
        ...order,
        id: docs.id,
      });
      setCartData([]);
      dispatch(actions.fetchCart([]));
      updateRemoteCart(userid, []);

      setCheckoutError(true);
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
    console.log(order);
    setDialogueopen(false);
  };
  const decreaseFromCart = async (item: any, e?: any) => {
    console.log(444);
    e.stopPropagation();
    if (login) {
      const cart: any[] = [...cartData];
      const index = cart.findIndex((el) => el.id === item.id);
      const cartItem = cart[index];
      if (index !== -1) {
        if (cartItem?.count > 1) {
          cart[index] = { ...cart[index], count: cart[index].count - 1 };
        } else {
          cart.splice(index, 1);
        }
      }
      await updateRemoteCart(userid, cart);
      setCartData(cart);
      dispatch(actions.fetchCart(cart));
    } else {
      const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
      const index = cart.findIndex((el) => el.id === item.id);
      const cartItem = cart[index];
      let temp: any[] = [];
      if (index !== -1) {
        if (cartItem?.count > 1) {
          cart[index] = { ...cart[index], count: cart[index].count - 1 };
          temp = cartData.map((el: any, i: number, arr: any[]) => {
            return { ...el, count: cart[i].count };
          });
        } else {
          cart.splice(index, 1);
          temp = cartData.map((el, i) => {
            return { ...el };
          });
          temp.splice(index, 1);
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      setCartData(temp);
      dispatch(actions.fetchCart(temp));
    }
  };
  console.log(111, cartData);
  const emptyCartComponent = () => {
    return (
      <Box className={css.emptyCartContainer}>
        <img src={Images.cartIcon} height={100} alt={"carticon "}></img>

        <p style={{ margin: "30px 0" }}>Your shopping cart is empty !</p>
        <Button
          variant="contained"
          className={css.exploreButton}
          onClick={() => history.push("/")}
        >
          Let's Explore
        </Button>
      </Box>
    );
  };
  const closeCheckoutDialog = () => {
    setDialogueopen(false);
  };
  const onCloseModalHandler = () => {
    setModalOpen(false);
    history.push("/orders");
  };
  const proceedOrderHandler = () => {
    if (login) {
      setDialogueopen(true);
    } else {
      history.push("/login", { from: "cart" });
    }
  };

  return (
    <Container className={css.mainContainer} maxWidth="lg">
      {loading ? (
        <CartLoader />
      ) : cartData.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper style={{ margin: 0, borderRadius: 0 }} elevation={2}>
              <div>
                <p className={css.cartHeading}>My Cart ({cartData.length})</p>
              </div>
              <Divider />

              {cartData.map((el, i) => {
                return (
                  <>
                    <div
                      className={css.itemContainer}
                      key={i}
                      onClick={() =>
                        history.push("/product-detail", { data: el })
                      }
                    >
                      <div className={css.itemLeft}>
                        <ImageCard height={100} imgSrc={el.imageUrl} />
                      </div>
                      <div className={css.itemRight}>
                        <p className={css.itemName}>{el.name}</p>
                        <p className={css.itemBrand}>{el.brand}</p>
                        <p className={css.itemPrice}>&#8377; {el.price}</p>
                        <div className={css.buttonContainer}>
                          <ButtonGroup
                            size="small"
                            variant="outlined"
                            aria-label="outlined primary button group"
                          >
                            <Button onClick={(e) => decreaseFromCart(el, e)}>
                              -
                            </Button>
                            <Button style={{ backgroundColor: "white" }}>
                              {el.count}
                            </Button>
                            <Button onClick={(e) => addToCart(el, e)}>+</Button>
                          </ButtonGroup>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => deleteItemFromCart(el, e)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Divider style={{ width: "90%" }} />
                    </div>
                  </>
                );
              })}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ margin: 0, borderRadius: 0 }} elevation={2}>
              <p className={css.priceHeading}> PRICE DETAILS </p>
              <Divider />

              <div className={css.priceItemContainer}>
                <p>Price ({cartData.length} items)</p>
                <p>&#8377; {priceCalculation(cartData, "price")}</p>
              </div>
              <div className={css.priceItemContainer}>
                <p>Discount</p>
                <p style={{ color: "green" }}>
                  - &#8377; {priceCalculation(cartData, "discount")}
                </p>
              </div>
              <div className={css.priceItemContainer}>
                <p>Coupon</p>
                <p style={{ color: "green" }}>- &#8377; 555</p>
              </div>
              <div className={css.totalAmountContainer}>
                <p>Total Amount</p>
                <p>&#8377; {priceCalculation(cartData, "amount")} </p>
              </div>
              <p className={css.saveLine}>
                You will save &#8377;{" "}
                {priceCalculation(cartData, "discount") + 555} on this order
              </p>
              <div className={css.placeOrderContainer}>
                <Button
                  style={{ backgroundColor: Colors.orange, width: "70%" }}
                  variant="contained"
                  size="large"
                  onClick={proceedOrderHandler}
                >
                  PlACE ORDER
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        emptyCartComponent()
      )}
      <CheckoutDialog
        cart={cartData}
        open={dialogueopen}
        user={userData}
        handleClose={closeCheckoutDialog}
        postOrderHandler={placeOrderHandler}
        amount={priceCalculation(cartData, "amount")}
      />
      <Modal open={modalOpen} handleClose={onCloseModalHandler} />
    </Container>
  );
};

export default memo(CartComponent);
