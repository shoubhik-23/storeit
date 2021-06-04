import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Message from "../../common/message";
import Alert from "../../common/alert";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { getReset, postNewPassword } from "../../service/dataService";
import { useHistory, useParams } from "react-router";

function NewPassword(props) {
  const history = useHistory();
  const param = useParams().token;
  const [signUpData, setSignUpData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: false,
    phone: false,
    password: false,
    confirm: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const handlePasswordChange = (e) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, password: e.target.value });
    if (value) {
      value.length < 6
        ? setError({ ...error, password: true })
        : setError({ ...error, password: false });
    } else setError({ ...error, password: false });
  };
  const handleConfirmPasswordChange = (e) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, confirmPassword: e.target.value });

    if (value) {
      value !== signUpData.password
        ? setError({ ...error, confirm: true })
        : setError({ ...error, confirm: false });
    } else setError({ ...error, confirm: false });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const onSubmitHandler = () => {
    postNewPassword(param, { password: signUpData.password })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          if (data.message === "success") {
            setMessage("Password Successfully Changed!");
            setSuccess(true);
            setOpen(true);
          } else {
            setSuccess(false);
            setOpen(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const handleClose = () => {
    history.push("/login");
    setOpen(false);
  };
  return (
    <Grid container style={{ marginTop: 80, justifyContent: "center" }}>
      <Grid item xs={10} sm={6} md={4}>
        <Paper style={{ padding: "20px 10px 20px 10px" }}>
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
                Change Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl size="small" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={signUpData.password}
                  onChange={handlePasswordChange}
                  error={error.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={100}
                />
                {error.password ? (
                  <FormHelperText style={{ color: "red" }}>
                    Password should be of minimum 5 characters
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl size="small" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={signUpData.confirmPassword}
                  error={error.confirm}
                  onChange={handleConfirmPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={160}
                />
                {error.confirm ? (
                  <FormHelperText style={{ color: "red" }}>
                    Password didn't match
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {!signUpData.password ||
              !signUpData.confirmPassword ||
              error.password ||
              error.confirm ? (
                <Button
                  variant="contained"
                  disabled
                  fullWidth
                  style={{ backgroundColor: "grey", color: "white" }}
                >
                  <Typography style={{ fontWeight: 600 }}>Submit</Typography>
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#419168", color: "white" }}
                  onClick={onSubmitHandler}
                >
                  <Typography style={{ fontWeight: 600 }}>Submit</Typography>
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
    </Grid>
  );
}

export default NewPassword;
