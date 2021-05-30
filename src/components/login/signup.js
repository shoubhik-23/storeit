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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { postSignUp } from "../../service/dataService";

const SignUp = (props) => {
  const history = useHistory();
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
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Grid container style={{ justifyContent: "center", marginTop: 80 }}>
      <Grid
        item
        xs={10}
        sm={6}
        md={4}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "10px 10px 30px 10px",
            backgroundColor: "#F8F5E8",
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
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
                          <Visibility />
                        ) : (
                          <VisibilityOff />
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
    </Grid>
  );
};

export default SignUp;
