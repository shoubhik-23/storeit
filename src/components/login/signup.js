import {
  Paper,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  Box,
  FormHelperText,
  withWidth,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as action from "../../store/action";

import CustomizedSnackbars from "../../common/alert";
import {
  addLocalToCart,
  postGoogleLogin,
  postSignUp,
} from "../../service/dataService";

const SignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: {
      first: "",
      last: "",
    },
    address: undefined,
  });
  const [error, setError] = useState({
    email: false,
    phone: false,
    password: false,
    confirm: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleEmailChange = (e) => {
    let value = e.target.value;
    setSignUpData({ ...signUpData, email: value });
    if (value) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        )
      ) {
        setError({ ...setError, email: false });
      } else setError({ ...setError, email: true });
    } else setError({ ...setError, email: false });
  };
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
  const signUpHandler = () => {
    postSignUp({
      email: signUpData.email,
      password: signUpData.password,
      confirm: signUpData.confirmPassword,
      phone: signUpData.phone,
      firstName: signUpData.name.first,
      lastName: signUpData.name.last,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          history.push("/login");
        } else {
          setSnackMessage(data.message);
          setSnackOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCloseSnack = () => {
    setSnackOpen(false);
  };
  const responseGoogle = (response) => {
    postGoogleLogin({ token: response.tokenId })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.message === "success") {
          dispatch(action.setCart());
          localStorage.setItem("shop_token", data.token);
          localStorage.setItem("shop_id", data.userId);
          localStorage.setItem("user_name", data.name);

          addLocalToCart(
            localStorage.getItem("cart"),
            localStorage.getItem("shop_token")
          ).then((data) => {
            localStorage.setItem("cart", JSON.stringify([]));
            window.location.reload();
            history.push("/");
          });
        } else {
          setSnackMessage(data.message);
          setSnackOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grid container style={{ justifyContent: "center", marginTop: 80 }}>
      <Grid
        item
        xs={11}
        sm={6}
        md={4}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={props.width === "xs" ? 0 : 3}
          variant={props.width === "xs" ? "outlined" : "elevation"}
          style={{
            padding: "10px 10px 30px 10px",
            // backgroundColor: " #f2f2f2",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Typography style={{ fontWeight: 600, fontSize: 20 }}>
              Sign Up
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container justify="center" item md={6}>
              <TextField
                fullWidth
                required
                size="small"
                label="First Name"
                variant="outlined"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    name: { ...signUpData.name, first: e.target.value },
                  })
                }
                value={signUpData.name.first}
              ></TextField>
            </Grid>
            <Grid container justify="center" item md={6}>
              <TextField
                fullWidth
                required
                size="small"
                label="Last Name"
                variant="outlined"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    name: { ...signUpData.name, last: e.target.value },
                  })
                }
                value={signUpData.name.last}
              ></TextField>
            </Grid>
            <Grid container justify="center" item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                label="Email"
                variant="outlined"
                onChange={handleEmailChange}
                value={signUpData.email}
                error={error.email}
                helperText={error.email ? "Please enter a valid email" : null}
              ></TextField>
            </Grid>
            <Grid container justify="center" item xs={12}>
              <MaterialUiPhoneNumber
                fullWidth
                size="small"
                defaultCountry={"in"}
                label="Phone "
                required
                variant="outlined"
                onChange={(value) =>
                  setSignUpData({
                    ...signUpData,
                    phone: value,
                  })
                }
                value={signUpData.phone}
              ></MaterialUiPhoneNumber>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <FormControl size="small" variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
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
                        {showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
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
                  Confirm Password
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
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={130}
                />
                {error.confirm ? (
                  <FormHelperText style={{ color: "red" }}>
                    Password didn't match
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {!signUpData.name.first ||
              !signUpData.name.last ||
              !signUpData.phone ||
              !signUpData.password ||
              !signUpData.confirmPassword ||
              !signUpData.email ||
              error.password ||
              error.confirm ||
              error.phone ||
              error.email ? (
                <Button
                  variant="contained"
                  disabled
                  style={{ backgroundColor: "grey", color: "white" }}
                >
                  <Typography style={{ fontWeight: "lighter" }}>
                    Submit
                  </Typography>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#419168", color: "white" }}
                  onClick={signUpHandler}
                >
                  <Typography style={{ fontWeight: "lighter" }}>
                    Submit
                  </Typography>
                </Button>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <GoogleLogin
                style={{ border: "solid" }}
                clientId={process.env.REACT_APP_API_KEY}
                render={(renderProps) => (
                  <GoogleButton
                    style={{}}
                    label="Sign up with Google"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  ></GoogleButton>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography style={{ fontWeight: 600 }}>
                Have an account?
                <span
                  onClick={() => history.push("/login")}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  &nbsp; Login here
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <CustomizedSnackbars
        open={snackOpen}
        message={snackMessage}
        handleClose={handleCloseSnack}
      ></CustomizedSnackbars>
    </Grid>
  );
};

export default withWidth()(SignUp);
