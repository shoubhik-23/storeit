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
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({ email: false });
  const handleEmailChange = (e) => {
    setSignUpData({ ...signUpData, email: e.target.value });
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        signUpData.email
      )
    ) {
      setError({ ...setError, email: false });
    } else setError({ ...setError, email: true });
  };
  const handlePasswordChange = (e) => {
    setSignUpData({ ...signUpData, password: e.target.value });
  };
  const handleConfirmPasswordChange = (e) => {
    setSignUpData({ ...signUpData, confirmPassword: e.target.value });
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
    <Grid container style={{ justifyContent: "center" }}>
      <Grid
        item
        xs={10}
        sm={6}
        md={4}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper
          square
          variant="outlined"
          elevation={4}
          style={{ padding: "10px 10px 30px 10px" }}
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
          <Grid container spacing={4}>
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
              ></TextField>
            </Grid>
            <Grid container justify="center" item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Phone "
                required
                variant="outlined"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    phone: e.target.value,
                  })
                }
                value={signUpData.phone}
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
                  type={showPassword ? "text" : "password"}
                  value={signUpData.password}
                  onChange={handlePasswordChange}
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
                onClick={signUpHandler}
              >
                <Typography style={{}}>Submit</Typography>
              </Button>
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
