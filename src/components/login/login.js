import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  withWidth,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@material-ui/icons";
import {
  addLocalToCart,
  postLogin,
  postGoogleLogin,
} from "../../service/dataService";
import { Token } from "../../constant/Api";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import CustomizedSnackbars from "../../common/alert";
import * as action from "../../store/action";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    token: undefined,
    emailError: false,
    open: false,
    message: "",
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleEmailChange = (event) => {
    let string = event.target.value;
    this.setState({ email: string });
    if (string) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          string
        )
      ) {
        this.setState({ emailError: false });
      } else {
        this.setState({ emailError: true });
      }
    } else {
      this.setState({ emailError: false });
    }
  };
  handleChange = (event) => {
    this.setState({ password: event.target.value });
  };
  loginHandler = async () => {
    postLogin({ email: this.state.email, password: this.state.password })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.message === "success") {
          this.props.setCart();
          localStorage.setItem("shop_token", data.token);
          localStorage.setItem("shop_id", data.userId);
          localStorage.setItem("user_name", data.name);

          this.setState({ token: localStorage.getItem("shop_token") });
          addLocalToCart(
            localStorage.getItem("cart"),
            localStorage.getItem("shop_token")
          ).then((data) => {
            localStorage.setItem("cart", JSON.stringify([]));
            window.location.reload();
            this.props.history.push("/");
          });
        } else {
          this.setState({ open: true, message: data.message });
        }
      })
      .catch((err) => console.log(err));
  };
  responseGoogle = (response) => {
    postGoogleLogin({ token: response.tokenId })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.message === "success") {
          this.props.setCart();
          localStorage.setItem("shop_token", data.token);
          localStorage.setItem("shop_id", data.userId);
          localStorage.setItem("user_name", data.name);

          this.setState({ token: localStorage.getItem("shop_token") });
          addLocalToCart(
            localStorage.getItem("cart"),
            localStorage.getItem("shop_token")
          ).then((data) => {
            localStorage.setItem("cart", JSON.stringify([]));
            window.location.reload();
            this.props.history.push("/");
          });
        } else {
          this.setState({ open: true, message: data.message });
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
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
            elevation={this.props.width === "xs" ? 0 : 3}
            variant={this.props.width === "xs" ? "outlined" : "elevation"}
            style={{
              padding: "20px 10px 30px 10px",
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
                Login
              </Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid container justify="center" item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Email"
                  variant="outlined"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                  error={this.state.emailError}
                  helperText={
                    this.state.emailError ? "Please enter a valid email" : null
                  }
                ></TextField>
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
                    id="outlined-adornment-password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? (
                            <VisibilityOutlined />
                          ) : (
                            <VisibilityOffOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {this.state.emailError || !this.state.email ? (
                  <Button
                    variant="contained"
                    disabled
                    style={{ backgroundColor: "grey", color: "white" }}
                  >
                    <Typography style={{ fontWeight: "lighter" }}>
                      Login
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#419168", color: "white" }}
                    onClick={this.loginHandler}
                  >
                    <Typography style={{ fontWeight: "lighter" }}>
                      Login
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
                      label="Sign in with Google"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    ></GoogleButton>
                  )}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  onClick={() => this.props.history.push("/forget")}
                  style={{
                    color: "blue",
                    margin: "-15px 0px",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Typography style={{ fontWeight: 600 }}>
                  Dont have an account?
                  <span
                    onClick={() => this.props.history.push("/signup")}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    &nbsp; Sign Up here
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <CustomizedSnackbars
          open={this.state.open}
          message={this.state.message}
          handleClose={() => this.setState({ open: false })}
        ></CustomizedSnackbars>
      </Grid>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCart: () => dispatch(action.setCart()),
  };
};
export default connect(null, mapDispatchToProps)(withWidth()(Login));
