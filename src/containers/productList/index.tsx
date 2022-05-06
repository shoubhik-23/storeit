import { Box, Button, ButtonGroup, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import Colors from "../../utils/colors";
import csclass from "./style.module.css";

const ProductListComponent = () => {
  const store = useSelector((state: any) => {
    return state;
  });
  const { home, profile } = store;
  const { login } = profile;
  const history = useHistory();
  const data = home.products;
  function addToCart(item: any) {
    console.log(item.id);
    const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
    const index = cart.findIndex((el) => el.id === item.id);
    if (index === -1) {
      cart.push({ id: item.id, count: 1 });
    } else {
      cart[index] = { ...cart[index], count: cart[index].count + 1 };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function deleteFromCart(item: any) {
    console.log(item.id);
    const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
    const index = cart.findIndex((el) => el.id === item.id);
    const cartItem = cart[index];
    if (index !== -1) {
      if (cartItem?.count > 1) {
        cart[index] = { ...cart[index], count: cart[index].count - 1 };
      } else {
        cart.splice(index, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  const renderCartButton = (item: any) => {
    const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);
    const index = cart.findIndex((el) => el.id === item.id);
    if (index == -1) {
      return (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => addToCart(item)}
            size="small"
            style={{
              backgroundColor: Colors.orange,
              color: "white",
            }}
          >
            Add to Cart
          </Button>
        </Box>
      );
    } else {
      return (
        <ButtonGroup
          size="small"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => deleteFromCart(item)}>-</Button>
          <Button>-</Button>
          <Button onClick={() => addToCart(item)}>+</Button>
        </ButtonGroup>
      );
    }
  };

  return (
    <Grid container className={csclass.container}>
      {data.map((el: any, i: number) => (
        <Grid
          key={i}
          item
          xs={6}
          className={csclass.alignCenter}
          style={{ padding: "10px 10px" }}
          sm={4}
          md={3}
        >
          <Paper className={csclass.paper} square elevation={4}>
            <Box
              className={[csclass.boxContainer].join(" ")}
              onClick={() => history.push("/product-detail", { data: el })}
            >
              <Box
                className={csclass.imageBox}
                style={{
                  height: 150,
                }}
              >
                <ImageCard
                  width={"90%"}
                  imgSrc={el.imageUrl}
                  height={"100%"}
                  // maxHeight={300}
                />
              </Box>

              <p className={csclass.brand}>{el.brand}</p>
              <p className={csclass.price}>
                &#8377; {parseFloat(el.price).toFixed(2)}
              </p>
              <p className={csclass.name}>{el.name}</p>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListComponent;
