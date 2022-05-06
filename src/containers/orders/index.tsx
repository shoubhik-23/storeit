import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
} from "@mui/material";
import React, { Component } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../../firebase/firebase_Config";
import { connect } from "react-redux";
import "./style.css";
import css from "./style.module.css";
import OrderCards from "./OrderCards";

class OrderComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: [],
      orders: [],
    };
  }
  thiss = 7;
  onHandleChange = (index: number) => {
    let temp = [...this.state.expanded];
    for (let i = 0; i < temp.length; i++) {
      if (i === index) {
        temp[i] = true;
      } else temp[i] = false;
    }
    this.setState({ expanded: temp });
  };
  componentDidMount() {
    this.fetchOrders();
  }
  fetchOrders = async () => {
    let orders: any[] = [];
    const orderRef: any = collection(firebaseDB, "orders");
    const productsRef = collection(firebaseDB, "products");

    const q = query(orderRef, where("userid", "==", this.props.userid));
    const userQuerySnapshot = await getDocs(q);
    userQuerySnapshot.forEach((doc: any) => {
      orders.push(doc.data());
    });
    for (let i in orders) {
      for (let j in orders[i].items) {
        const q = query(productsRef, where("id", "==", orders[i].items[j].id));
        const querySnapshot = await getDocs(q);
        let docs: any = {};
        querySnapshot.forEach((doc: any) => {
          docs = doc.data();
        });
        orders[i].items[j] = { ...orders[i].items[j], ...docs };
      }
    }
    this.setState({
      orders,
      expanded: Array(orders.length).fill(false, 0),
    });
  };

  render() {
    console.log(this.props);
    if (!this.props.login) {
      return (
        <Grid container className={css.profileMainContainer}>
          <Grid item xs={12}>
            <Box className={css.justifyCenter}>
              <p className={css.loginText}>
                Please login to your account to view the details
              </p>
            </Box>
            <Box className={css.justifyCenter}>
              <Button
                onClick={() => this.props.history.push("/login")}
                variant="outlined"
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container style={{ marginTop: 80, justifyContent: "center" }}>
          {this.state.orders.length > 0
            ? this.state.orders.map((el: any, i: any) => (
                <Grid
                  item
                  container
                  xs={12}
                  style={{ justifyContent: "center" }}
                  key={i}
                >
                  <Grid item xs={12} sm={6}>
                    <OrderCards
                      expanded={this.state.expanded[i]}
                      items={el?.items}
                      date={el.date}
                      onHandleChange={() => this.onHandleChange(i)}
                    />
                  </Grid>
                </Grid>
              ))
            : null}
        </Grid>
      );
    }
  }
}
const mapStateToProps = (state: any) => {
  return {
    userid: state.profile?.userid,
    login: state.profile?.login,
  };
};
export default connect(mapStateToProps)(OrderComponent);
