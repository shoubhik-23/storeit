import { Check, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";

const CheckoutDialog = (props: any) => {
  return (
    <Dialog
      style={{ overflow: "hidden" }}
      maxWidth="sm"
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={props.open}
    >
      <DialogContent id="alert-dialog-title">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p style={{ fontWeight: 600, fontSize: 20 }}>
              SubTotal :
              <span style={{ color: "red" }}>&nbsp; ₹ {props.amount}</span>
            </p>
          </Grid>
          {props.cart?.map((el: any) => (
            <Grid item xs={12}>
              <p>
                {el.count} &#215; {el.name}
              </p>
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
                <p style={{ fontSize: "14", fontWeight: 600 }}>Delivery To:</p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  {props.user?.firstName} {props.user?.lastName}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p> Ph:{props.user?.phone ? props.user.phone : "XXXXXXXXX"}</p>
              </Grid>
              <Grid item xs={12}>
                {props.user?.address ? (
                  <p
                    style={{
                      wordWrap: "break-word",
                    }}
                  >
                    {props.user?.address?.state},&nbsp;
                    {props.user?.address?.region},&nbsp;
                    {props.user?.address?.fullAddress},&nbsp;
                    {props.user?.address?.pin} &nbsp;
                  </p>
                ) : (
                  <Button
                    variant="contained"
                    //   onClick={() => this.props.history.push("/profile")}
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
              onClick={props.handleClose}
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
              onClick={props.postOrderHandler}
            >
              Confirm
            </Button>
            {/* <CheckoutDialog
            open={this.state.open}
            handleClose={this.handleClose}
          ></CheckoutDialog> */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
