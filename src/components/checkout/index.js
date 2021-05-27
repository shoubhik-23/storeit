import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import * as action from "../../store/action";
import {
  deleteFullCart,
  getCart,
  getUser,
  postOrder,
} from "../../service/dataService";
import CheckoutDialog from "./dialog";
class Checkout extends React.PureComponent {
  state = {
    open: false,
    address: {
      name: "",
      email: "",
      phone: "",
      state: "",
      region: "",
      detail: "",
      pin: "",
    },
    cart: [],
  };
  componentDidMount() {
    getUser()
      .then((resp) => resp.json())
      .then(
        (data) =>
          data?.message === "success" &&
          this.setState({ address: { ...data.data } })
      )
      .catch((err) => console.log(err));

    getCart()
      .then((resp) => resp.json())
      .then((data) => this.setState({ cart: [...data.data] }))
      .catch((err) => console.log(err));
  }
  componentDidUpdate(prevProps, prevStates) {
    if (prevProps !== this.props) {
      getCart()
        .then((resp) => resp.json())
        .then((data) => this.setState({ cart: [...data.data] }))
        .catch((err) => console.log(err));
    }
  }
  calculatePrice = () => {
    let totalPrice = 0;
    if (this.state.cart.length > 0) {
      for (let i of this.state.cart) {
        totalPrice += parseInt(i.product.price) * parseInt(i.quantity);
      }
    }
    return totalPrice;
  };
  postOrderHandler = () => {
    postOrder()
      .then((resp) => resp.json())
      .then((data) => data?.message === "success" && deleteFullCart())
      .then((resp) => resp.json())
      .then((data) => {
        data?.message === "success" && this.props.updateCart();
        this.props.update();
        this.setState({ open: true });
      })
      .catch((err) => console.log(err));
  };
  handleClose = () => {
    this.props.history.push("/orders");
    this.props.handleClose();

    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <Dialog
          style={{ overflow: "hidden" }}
          maxWidth="xs"
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={this.props.open}
        >
          <DialogTitle id="alert-dialog-title">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography style={{ fontWeight: 600, fontSize: 20 }}>
                  SubTotal :
                  <span style={{ color: "red" }}>
                    &nbsp; ₹ {this.calculatePrice()}
                  </span>
                </Typography>
              </Grid>
              {this.state.cart.map((el) => (
                <Grid item xs={12}>
                  <Typography noWrap>
                    {el.quantity} &#215; {el.product.title}
                  </Typography>
                </Grid>
              ))}
              <Grid container item xs={12}>
                <Paper
                  variant="outlined"
                  style={{
                    width: "100%",
                    backgroundColor: "#e6e6e6",
                    padding: "5px 10px",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography style={{ fontSize: "14", fontWeight: 600 }}>
                      Delivery To:
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography> Shoubhik Maji</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography> Ph:{this.state.address.phone}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {this.state.address.state ? (
                      <Typography
                        style={{
                          wordWrap: "break-word",
                        }}
                      >
                        {this.state.address.state},&nbsp;
                        {this.state.address.region},&nbsp;
                        {this.state.address.detail},&nbsp;
                        {this.state.address.pin}, &nbsp;
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => this.props.history.push("/profile")}
                      >
                        Add Address
                      </Button>
                    )}
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={this.props.handleClose}
                  startIcon={<Close></Close>}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  startIcon={<Check></Check>}
                  variant="contained"
                  color="primary"
                  onClick={this.postOrderHandler}
                >
                  Confirm
                </Button>
                <CheckoutDialog
                  open={this.state.open}
                  handleClose={this.handleClose}
                ></CheckoutDialog>
              </Grid>
            </Grid>
          </DialogTitle>
        </Dialog>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: () => dispatch(action.setCart()),
  };
};

export default connect(null, mapDispatchToProps)(Checkout);
