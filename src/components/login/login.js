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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { addLocalToCart, postLogin } from "../../service/dataService";
import { Token } from "../../constant/Api";
import { useHistory } from "react-router";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    token: undefined,
  };
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handleChange = (event) => {
    this.setState({ password: event.target.value });
  };
  loginHandler = async () => {
    postLogin({ email: this.state.email, password: this.state.password })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message === "success") {
          localStorage.setItem("shop_token", data.token);
          localStorage.setItem("shop_id", data.userId);
          localStorage.setItem("cart", JSON.stringify([]));

          this.setState({ token: localStorage.getItem("shop_token") }, () =>
            addLocalToCart(
              JSON.parse(localStorage.getItem("cart")),
              this.state.token
            )
          );
          this.props.history.goBack();
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <Grid container style={{ justifyContent: "center" }}>
        <Grid
          item
          xs={10}
          sm={6}
          md={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Paper elevation={4} style={{ padding: "20px 10px 30px 10px" }}>
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
                            <Visibility />
                          ) : (
                            <VisibilityOff />
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
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#419168", color: "white" }}
                  onClick={this.loginHandler}
                >
                  <Typography style={{ fontWeight: "lighter" }}>
                    Login
                  </Typography>
                </Button>
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
      </Grid>
    );
  }
}
export default Login;
