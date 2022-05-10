import {
  Grid,
  Box,
  Button,
  Container,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import Colors from "../../utils/colors";
import { GetScreenWidth } from "../../utils/getScreenWidth";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";

import css from "./style.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../login/actions";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase/firebase_Config";

const ProductDetailsComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state: any) => {
    return state;
  });
  const { home, profile } = store;
  const { login, userid } = profile;
  const { state }: any = location;
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<boolean>(false);

  const { data = {} } = state;
  const [cartData, setCartData] = useState<any[]>([]);
  useEffect(() => {
    login ? getRemoteCartData() : getLocalCartData();
  }, [login]);
  const addToCart = async (item: any) => {
    setProgress(true);
    if (login) {
      const cart: any[] = [...cartData];
      const index = cart.findIndex((el) => el.id === item.id);
      if (index === -1) {
        cart.push({ id: item.id, count: 1 });
      } else {
        cart[index] = { ...cart[index], count: cart[index].count + 1 };
      }

      await updateRemoteCart(userid, cart);
      setCartData(cart);
      setProgress(false);
      dispatch(actions.fetchCart(cart));
    } else {
      const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
      const index = cart.findIndex((el) => el.id === item.id);
      if (index === -1) {
        cart.push({ id: item.id, count: 1 });
      } else {
        cart[index] = { ...cart[index], count: cart[index].count + 1 };
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      let temp = cart.map((el: any, i: number, arr: any[]) => {
        return { ...el, count: cart[i].count };
      });
      setCartData(temp);
      setProgress(false);

      dispatch(actions.fetchCart(temp));
    }
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
    setLoading(false);
  };
  const getRemoteCartData = async () => {
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
    setLoading(false);
  };
  const updateRemoteCart = async (uid: any, updatedCart: any[]) => {
    const cart: any[] = [...updatedCart];

    const userRef = doc(firebaseDB, "users", uid);

    await updateDoc(userRef, {
      cart: cart,
    });
  };
  return (
    <Container style={{ marginTop: 80, padding: 0 }} maxWidth="lg" fixed>
      <Paper className={css.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
            >
              <ImageCard
                width={"100%"}
                maxHeight={300}
                height={"100%"}
                imgSrc={data.imageUrl}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <p className={css.productName}>{data.name}</p>
              <Box style={{ display: "flex" }}>
                <p
                  style={{
                    flex: 0.8,
                    color: "blue",
                    fontWeight: 400,
                    fontSize: "1.1rem",
                  }}
                >
                  {data.brand}
                </p>
                <p style={{}}>
                  <StarIcon style={{ fontSize: 15, color: "green" }} />
                  <StarIcon style={{ fontSize: 15, color: "green" }} />

                  <StarIcon style={{ fontSize: 15 }} />
                  <StarIcon style={{ fontSize: 15 }} />
                </p>
              </Box>
              <Box style={{ display: "flex" }}>
                <p className={css.mrpKey}>MRP : </p>
                <p className={css.mrpValue}> &nbsp; &#8377; {data.price}</p>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "7px 0",
                }}
              >
                <p className={css.priceKey}>Price : </p>
                <p className={css.priceValue}>&nbsp; &#8377; {data.discount}</p>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p className={css.youSaveKey}>You Save : </p>
                <p className={css.youSaveValue}>
                  &nbsp; &#8377;
                  {(parseFloat(data.price) - parseFloat(data.discount)).toFixed(
                    2
                  )}
                </p>
                <div className={css.badge}>
                  {(
                    ((parseFloat(data.price) - parseFloat(data.discount)) /
                      parseFloat(data.price)) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </div>
              </Box>
              <Divider style={{ marginTop: 20 }} />
              <Box>
                <p style={{ fontWeight: "bold" }}>About this item :</p>
                {data.description.map((el: any, i: any) => (
                  <p
                    className={css.description}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FiberManualRecordIcon
                      style={{ fontSize: 12, color: "grey", marginRight: 10 }}
                    />
                    {el}.
                  </p>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {cartData.findIndex(
                (item: any, index: number) => item?.id === data.id
              ) === -1 ? (
                <Button
                  onClick={() => addToCart(data)}
                  startIcon={<ShoppingCartIcon />}
                  className={css.addToCartButton}
                >
                  {progress ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => history.push("/cart")}
                  startIcon={<ShoppingCartIcon />}
                  className={css.addToCartButton}
                >
                  Go to Cart
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailsComponent;
