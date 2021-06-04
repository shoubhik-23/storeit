import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  withWidth,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_POINT, Token } from "../../constant/Api";
import { addToCart, getProductDetail } from "../../service/dataService";
import * as action from "../../store/action";

const Product = (props) => {
  const [data, setData] = useState(props.location.state.data);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    props.location.state.data.description.split(";")
  );
  const dispatch = useDispatch();

  const addToLocalCart = () => {
    getProductDetail(data._id)
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
      addToCart(data._id)
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

  return (
    <Grid
      container
      style={{ marginTop: 80, display: "flex", justifyContent: "center" }}
    >
      <Grid item xs={props.width === "xs" ? 11 : 8}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box style={{ height: 200, width: 100 }}>
              <img
                style={{ height: "100%", width: "100%" }}
                src={`${API_POINT}/${data.image}`}
                alt="productImage"
              ></img>
            </Box>
          </Grid>

          <Grid container item xs={12} md={8}>
            <Grid item xs={12}>
              <Typography
                style={{
                  color: "red",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                {" "}
                ₹ {data.price}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {description.map((el, i) => (
                <Box style={{ display: "flex" }}>
                  <div>&#9830;</div>
                  <Typography
                    key={i}
                    style={{ marginLeft: "1rem", fontSize: 14 }}
                  >
                    {el.trim()}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {loading ? (
              <Button
                style={{ margin: "10px 10px" }}
                variant="contained"
                color="secondary"
                disabled
                onClick={addCartHandler}
              >
                <CircularProgress size={24}></CircularProgress>
              </Button>
            ) : (
              <Button
                style={{ margin: "10px 10px" }}
                variant="contained"
                color="secondary"
                onClick={addCartHandler}
              >
                Add To Cart
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withWidth()(Product);
