import React from "react";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import Logo from "../../assets/images/congrats.png";

function Modal(props: any) {
  console.log(1111, props.open);
  return (
    <Dialog
      maxWidth="xs"
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={props.open}
    >
      <DialogTitle>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography style={{ fontSize: 18, fontWeight: 600 }}>
              Thank You for Shopping with us!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Box style={{ width: "20vh", height: "20vh" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={Logo}
                alt="congrats_logo"
              ></img>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={props.handleClose}
              style={{ backgroundColor: "#419168", color: "white" }}
            >
              Okay
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
}

export default Modal;
