import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { API_POINT } from "../../constant/Api";
import { getInvoice } from "../../service/dataService";

function OrderCards(props) {
  const calculatePrice = () => {
    let totalPrice = 0;
    if (props.data.products.length > 0) {
      for (let i of props.data.products) {
        totalPrice += parseInt(i.product.price) * parseInt(i.quantity);
      }
    }
    return totalPrice;
  };
  const getInvoiceDetail = async () => {
    await getInvoice({ orderId: props.data._id })
      .then((res) => res.json())
      .then((data) => window.open(`${API_POINT}/${data.data}`))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Paper
        square
        elevation={3}
        style={{
          padding: "10px 20px",
          backgroundColor: "rgb(255, 255, 255,0.5)",
        }}
      >
        <Grid item container spacing={1}>
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: 16,
                fontWeight: 600,
                opacity: 0.8,
                fontFamily: "monospace",
              }}
            >
              OrderId. &nbsp;{props.data._id}
            </Typography>{" "}
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: "red", fontWeight: 600 }}>
              {" "}
              ₹ {calculatePrice()}{" "}
            </Typography>{" "}
          </Grid>
          <Grid
            item
            xs={12}
            spacing={1}
            container
            style={{ height: 70, overflow: "hidden", overflowY: "scroll" }}
          >
            {props.data.products.map((el) => (
              <Grid item xs={12}>
                <Typography
                  style={{ fontSize: 14, marginBottom: "-1vh" }}
                  noWrap
                >
                  {" "}
                  {el.quantity} &#215; {el.product.title}{" "}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} style={{ marginTop: "2vh" }}>
            <Button
              size="small"
              variant="outlined"
              style={{ backgroundColor: "#62c8f0" }}
              onClick={getInvoiceDetail}
            >
              Get Invoice
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default OrderCards;
