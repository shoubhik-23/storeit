import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  withWidth,
} from "@material-ui/core";
import React, { useState } from "react";
import Message from "../../common/message";
import { postReset } from "../../service/dataService";
import Alert from "../../common/alert";
import { useHistory } from "react-router";
function PasswordForgot(props) {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleClose = () => {
    history.push("/login");

    setOpen(false);
  };
  const closeAlert = () => {
    setOpenAlert(false);
  };
  const handleEmailChange = (event) => {
    let string = event.target.value;
    setValue(string);
    if (string) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          string
        )
      ) {
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(false);
    }
  };
  const onSubmitHandler = () => {
    postReset({ email: value })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          if (data.message === "success") {
            setSuccess(true);
            setMessage("Password reset Link sent to your email!");
            setOpen(true);
          } else {
            setSuccess(false);
            setMessage(data.message);
            setOpenAlert(true);
          }
        }
      })
      .catch((err) => setOpenAlert(err.message));
  };
  console.log(message);
  return (
    <Grid container style={{ marginTop: 80, justifyContent: "center" }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper
          style={{ backgroundColor: "#F8F5E8", padding: "20px 10px 20px 10px" }}
        >
          <Grid
            container
            spacing={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 600,
                  opacity: 0.8,
                }}
              >
                Reset Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Email"
                value={value}
                onChange={handleEmailChange}
                error={error}
                helperText={error ? "Please enter a valid email" : null}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              {!value || error ? (
                <Button
                  variant="contained"
                  fullWidth
                  disabled
                  style={{ backgroundColor: "grey", color: "white" }}
                >
                  Reset
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#419168", color: "white" }}
                  disabled={error}
                  onClick={onSubmitHandler}
                >
                  Reset
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Message
        open={open}
        message={message}
        success={success}
        handleClose={handleClose}
      ></Message>
      <Alert
        open={openAlert}
        message={message}
        handleClose={closeAlert}
      ></Alert>
    </Grid>
  );
}

export default withWidth()(PasswordForgot);
