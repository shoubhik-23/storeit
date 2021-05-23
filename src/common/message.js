import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function Message(props) {
  console.log(props);
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      open={props.open}
    >
      <DialogTitle id="alert-dialog-title">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {props.success ? (
              <Box style={{ textAlign: "center" }}>
                <CheckCircleIcon
                  style={{ color: "green", fontSize: 70 }}
                ></CheckCircleIcon>
                <Typography
                  style={{ fontSize: 20, fontWeight: 500, opacity: 0.8 }}
                >
                  success !
                </Typography>
              </Box>
            ) : (
              <Box style={{ textAlign: "center" }}>
                <ErrorIcon style={{ color: "red", fontSize: 70 }}></ErrorIcon>
                <Typography
                  style={{ fontSize: 20, fontWeight: 500, opacity: 0.8 }}
                >
                  error!
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography style={{ fontSize: 20, fontWeight: 500, opacity: 1 }}>
              {props.message}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              fullWidth
              size="small"
              onClick={props.handleClose}
              style={{ backgroundColor: "#419168", color: "white" }}
            >
              OK
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
}

export default Message;
