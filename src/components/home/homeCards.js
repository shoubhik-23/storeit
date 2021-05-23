import {
  Badge,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API_POINT, Token } from "../../constant/Api";
import { addToCart, getProductDetail } from "../../service/dataService";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../store/action";
const style = makeStyles((theme) => ({
  card: {
    width: "20vh",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  root: {
    backgroundColor: "#669999",
    color: "white",
    borderRadius: "1px 2px 50% 50%",
  },
}));
function HomeCards(props) {
  const classes = style();
  const [data, setData] = useState(props.data);

  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
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
    if (Token()) {
      addToCart(props.data._id)
        .then((resp) => {
          dispatch(action.setCart());
        })
        .catch((err) => console.log(err));
    } else {
      addToLocalCart();
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
        elevation={5}
        style={{
          padding: "5px 5px",
          boxSizing: "border-box",
        }}
      >
        <Grid container className={classes.carxd}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              style={{
                height: 100,
                width: 50,
                display: "flex",

                justifyContent: "center",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  imageRendering: "crisp-edges",
                }}
                src={API_POINT + "/" + data.image}
                alt="home"
              ></img>
            </Box>
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
            <Button
              variant="contained"
              onClick={addCartHandler}
              style={{
                backgroundColor: "#ffff66",
                fontWeight: 600,
                width: "50%",
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </HOC>
  );
}

export default HomeCards;