import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  withWidth,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API_POINT, Token } from "../../constant/Api";
import { addToCart, getProductDetail } from "../../service/dataService";
import { useSpring, animated } from "react-spring";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/action";
const style = makeStyles((theme) => ({
  card: {
    padding: 0,
    minHeight: 210,
  },
  root: {
    backgroundColor: "#669999",
    color: "white",
    borderRadius: "1px 2px 50% 50%",
  },
  imageBox: {
    height: 100,

    width: 50,
    backgroundColor: "grey",
    display: "flex",

    justifyContent: "center",
  },
}));
function HomeCards(props) {
  const [flip, set] = useState(false);

  const anim = useSpring({
    config: { duration: 1000 },
    reset: true,
    reverse: flip,
    to: { opacity: 1 },
    from: { opacity: 0 },
    onRest: () => set(!flip),
  });

  const classes = style();
  const [data, setData] = useState(props.data);

  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleUpper, setTitleUpper] = useState(props.data.title.slice(0, 20));
  const [titleLower, setTitleLower] = useState(props.data.title.slice(20));
  const history = useHistory();
  useEffect(() => {
    setData(props.data);

    setTitleUpper(props.data.title.slice(0, 20));
    setTitleLower(props.data.title.slice(20));
    getQuantity();
  }, [props, cart]);
  const getQuantity = () => {
    let temp = [...cart];

    for (let i of temp) {
      if (i.product._id === props.data._id) {
        setQuantity(i.quantity);
      }
    }
  };
  const addToLocalCart = () => {
    getProductDetail(props.data._id)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "found") {
          let localCart = JSON.parse(localStorage.getItem("cart"));

          if (localCart.length === 0) {
            localCart.push({ product: data.data, quantity: 1 });
            localStorage.setItem("cart", JSON.stringify(localCart));
            dispatch(action.setCart());

            return;
          }

          const productId = localCart.findIndex(
            (el) => el.product._id.toString() === data.data._id.toString()
          );
          if (productId === -1) {
            localCart.push({ product: data.data, quantity: 1 });
          } else {
            const findProduct = localCart[productId];
            localCart[productId].quantity = findProduct.quantity + 1;
          }
          localStorage.setItem("cart", JSON.stringify(localCart));
        } else {
          alert("Something went wrong. Please try after sometime");
        }
        dispatch(action.setCart());
      })
      .catch((err) => console.log(err));
  };
  const addCartHandler = () => {
    setLoading(true);
    if (Token()) {
      addToCart(props.data._id)
        .then(async (resp) => {
          await dispatch(action.setCart());
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      addToLocalCart();
      setLoading(false);
    }
  };
  const HOC = (props) => {
    let comp;
    quantity > 0
      ? (comp = (
          <Badge
            badgeContent={quantity}
            classes={{
              badge: classes.root,
            }}
          >
            {props.children}
          </Badge>
        ))
      : (comp = <div>{props.children}</div>);
    return comp;
  };
  return (
    <HOC badgeContent={quantity} style={{ backgroundColor: "white" }}>
      <Paper
        elevation={3}
        style={{
          padding: "5px 5px",
          backgroundColor: "#F8F5E8",
        }}
      >
        <Grid container className={classes.card}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <animated.div
              className={classes.imageBox}
              style={!imageLoaded ? anim : null}
            >
              <img
                onLoad={() => setImageLoaded(true)}
                style={{
                  height: "100%",
                  visibility: imageLoaded ? "visible" : "hidden",
                  width: "100%",
                  imageRendering: "crisp-edges",
                }}
                src={API_POINT + "/" + data.image}
                alt="home"
              ></img>
            </animated.div>
          </Grid>
          <Grid
            item
            container
            xs={12}
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              history.push({
                pathname: "/product",
                state: {
                  data: data,
                },
              })
            }
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                width: 100,
              }}
            >
              <Typography noWrap style={{ textAlign: "center" }}>
                {titleUpper}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                width: 100,
              }}
            >
              <Typography noWrap style={{ textAlign: "center" }}>
                {titleLower}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "center", color: "#ff0000" }}>
              ₹ {data.price}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <Button size="small" variant="contained" disabled>
                <CircularProgress size={24}></CircularProgress>
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                onClick={addCartHandler}
                style={{
                  backgroundColor: "#419168",
                  color: "white",
                }}
              >
                Add To Cart
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </HOC>
  );
}

export default withWidth()(HomeCards);
