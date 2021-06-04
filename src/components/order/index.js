import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { useHistory } from "react-router";
import { Token } from "../../constant/Api";
import { getOrders } from "../../service/dataService";
import OrderCards from "./orderCards";
const EmptyProfile = (props) => {
  const history = useHistory();
  return (
    <Grid container spacing={3} style={{ marginTop: 60 }}>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Typography style={{ fontSize: 18, opacity: 0.7, fontWeight: 600 }}>
          Please Login to your account first.
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};
class Order extends Component {
  state = {
    loading: false,
    data: [],
  };
  componentDidMount() {
    this.setState({ loading: true });
    getOrders()
      .then((resp) => resp.json())
      .then((data) => {
        data?.message === "success" &&
          this.setState({ data: [...data.data], loading: false });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  render() {
    return (
      <>
        {Token() ? (
          <Grid
            container
            spacing={2}
            style={{ padding: "0px 1rem", marginTop: 60 }}
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
                  opacity: 0.7,
                  textDecoration: "underline",
                }}
              >
                My Orders
              </Typography>
            </Grid>
            {this.state.data.length === 0 && (
              <Grid item xs={12}>
                <Typography>You havent placed any order yet</Typography>
              </Grid>
            )}
            {this.state.data.length === 0 && (
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
            )}
            {this.state.loading ? (
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <CircularProgress></CircularProgress>
              </Grid>
            ) : (
              this.state.data.map((el) => (
                <Grid item xs={12}>
                  <OrderCards data={el}></OrderCards>
                </Grid>
              ))
            )}
          </Grid>
        ) : (
          <EmptyProfile></EmptyProfile>
        )}
      </>
    );
  }
}

export default Order;
