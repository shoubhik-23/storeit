import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { getCart } from "../../service/dataService";
import { Token } from "../../constant/Api";
import CartCards from "./cartCards";
import { Forward } from "@material-ui/icons";
import Logo from "../../assets/images/shopping-cart.png";

class Cart extends React.Component {
  state = {
    cart: [],
  };
  componentDidMount() {
    if (Token()) {
      getCart()
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message === "success") {
            this.setState({ cart: data.data });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
    }
  }
  update = () => {
    if (Token()) {
      getCart()
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message === "success") {
            this.setState({ cart: data.data });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
    }
  };

  checkoutHandler = () => {
    if (Token()) {
      alert("please wat");
    } else if (!Token()) {
      this.props.history.push("/login");
    }
  };
  render() {
    console.log(this.state);
    return (
      <Box style={{ padding: "0px 10px" }}>
        <Grid
          container
          spacing={5}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "left" }}
          >
            <Typography
              style={{
                fontSize: 25,
                fontWeight: 600,
                opacity: 0.8,
                textDecoration: "underline",
              }}
            >
              {" "}
              My Cart
            </Typography>
          </Grid>
          {this.state.cart.map((el, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <CartCards update={this.update} data={el} key={i}></CartCards>
            </Grid>
          ))}

          {this.state.cart.length > 0 ? (
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={this.checkoutHandler}
                fullWidth
                endIcon={<Forward fontSize="large"></Forward>}
                style={{
                  backgroundColor: "#419168",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "white",
                  height: 50,
                  padding: " 0px 20px",
                }}
              >
                Checkout
              </Button>
            </Grid>
          ) : (
            <Grid
              container
              spacing={4}
              item
              xs={12}
              style={{ textAlign: "center" }}
            >
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  style={{
                    width: 100,
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={Logo}
                    alt="cartIcon"
                  ></img>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    opacity: 0.8,
                  }}
                >
                  Your Shopping Cart is empty !
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{
                    backgroundColor: "#419168",
                    color: "white",

                    fontWeight: 600,
                  }}
                  onClick={() => this.props.history.push("/")}
                >
                  Click to Explore
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    );
  }
}
export default Cart;
