import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as action from "../../store/action";
import {
  addToCart,
  deleteFromCart,
  getProductDetail,
} from "../../service/dataService";
import { API_POINT, Token } from "../../constant/Api";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch } from "react-redux";

function CartCards(props) {
  const [data, setData] = useState(props.data);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.data.quantity);
  const [titleUpper, setTitleUpper] = useState(undefined);

  const [titleLower, setTitleLower] = useState(undefined);
  useEffect(() => {
    setData(props.data);
    setQuantity(props.data.quantity);
    setTitleUpper(props.data.product.title.slice(0, 20));
    setTitleLower(props.data.product.title.slice(21, 35));
  }, [props]);
  const addToLocalCart = () => {
    let localCart = JSON.parse(localStorage.getItem("cart"));

    const productId = localCart.findIndex(
      (el) => el.product._id.toString() === data.product._id.toString()
    );

    const findProduct = localCart[productId];
    localCart[productId].quantity = findProduct.quantity + 1;
    setQuantity((prev) => prev + 1);

    localStorage.setItem("cart", JSON.stringify(localCart));
    dispatch(action.setCart());

    props.update();
  };
  const deleteLocalCart = (all) => {
    let localCart = JSON.parse(localStorage.getItem("cart"));

    const productId = localCart.findIndex(
      (el) => el.product._id.toString() === data.product._id.toString()
    );
    if (all) {
      localCart.splice(productId, 1);
    } else {
      const findProduct = localCart[productId];
      let quantity = findProduct.quantity;
      if (quantity > 1) {
        localCart[productId].quantity = findProduct.quantity - 1;
        setQuantity((prev) => prev - 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(localCart));
    dispatch(action.setCart());

    props.update();
  };
  const deleteHandler = (all) => {
    if (Token()) {
      deleteFromCart({ productId: data.product._id }, all)
        .then((resp) => resp.json())
        .then((data) => {
          data?.message === "success" && setQuantity((prev) => prev - 1);
          dispatch(action.setCart());
          props.update();
        })
        .catch((err) => console.log(err));
    } else {
      deleteLocalCart(all);
    }
  };
  const addCartHandler = () => {
    if (Token()) {
      addToCart(data.product._id)
        .then((resp) => resp.json())
        .then((data) => {
          data?.message === "success" && setQuantity((prev) => prev + 1);
          dispatch(action.setCart());

          props.update();
        })
        .catch((err) => console.log(err));
    } else {
      addToLocalCart();
    }
  };
  return (
    <Paper
      elevation={5}
      style={{
        padding: "10px 5px",
        boxSizing: "border-box",
      }}
    >
      <Grid container>
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
              src={API_POINT + "/" + data.product.image}
              alt="item"
            ></img>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ cursor: "pointer" }}>
          <Typography style={{ textAlign: "center" }}>{titleUpper}</Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography style={{ textAlign: "center" }}>
              {titleLower}
            </Typography>
            <Typography>....</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography style={{ textAlign: "center", color: "red" }}>
            ₹ {data.product.price}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ButtonGroup
            color="primary"
            size="small"
            style={{ margin: "10px 0px" }}
          >
            <Button
              style={{ backgroundColor: "yellow" }}
              onClick={() => deleteHandler(false)}
            >
              <Remove style={{ color: "black" }}></Remove>
            </Button>
            <Button style={{ fontWeight: 600 }}>{quantity}</Button>
            <Button
              style={{ backgroundColor: "yellow" }}
              onClick={addCartHandler}
            >
              <Add style={{ color: "black" }}></Add>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            style={{
              width: "50%",
              backgroundColor: " #ff5c33 ",
              fontWeight: 600,
              color: "white",
            }}
            variant="contained"
            onClick={() => deleteHandler(true)}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartCards;