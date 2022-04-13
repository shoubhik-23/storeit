import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, firebaseDB } from "../../firebase/firebase_Config";
import * as actions from "../login/actions";
import MaterialUiPhoneNumber from "material-ui-phone-number";

import css from "./style.module.css";
import { useHistory } from "react-router-dom";

const RegisterComponent = () => {
  const dispatch = useDispatch();
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({
    email: false,
    phone: false,
    password: false,
    confirm: false,
  });
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onEmailChangeHandler = (e: any) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, email: value });
    if (value) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        )
      ) {
        setError({ ...error, email: false });
      } else setError({ ...error, email: true });
    } else setError({ ...error, email: false });
  };
  const handlePasswordChange = (e: any) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, password: e.target.value });
    if (value) {
      value.length < 6
        ? setError({ ...error, password: true })
        : setError({ ...error, password: false });
    } else setError({ ...error, password: false });
  };
  const handleConfirmPasswordChange = (e: any) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, confirmPassword: e.target.value });

    if (value) {
      value !== signUpData.password
        ? setError({ ...error, confirm: true })
        : setError({ ...error, confirm: false });
    } else setError({ ...error, confirm: false });
  };
  const signUpWithEmail = () => {
    dispatch(
      actions.signUpUser(signUpData.email, signUpData.password, history)
    );
  };
  const onSubmitHandler = () => {
    signUpWithEmail();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Container className={css.loginContainer} maxWidth={"sm"} fixed>
      <Paper className={css.loginPaper} elevation={4}>
        <Grid container>
          <Grid item xs={12}>
            <p className={css.loginHeading}>Sign Up</p>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                className={css.textFields}
                label="First Name"
                fullWidth
                size="small"
                value={signUpData.name.first}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    name: { ...signUpData.name, first: e.target.value },
                  })
                }
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                className={css.textFields}
                label="Last Name"
                fullWidth
                size="small"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    name: { ...signUpData.name, last: e.target.value },
                  })
                }
                value={signUpData.name.last}
              ></TextField>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              className={css.textFields}
              label="email"
              fullWidth
              size="small"
              error={error.email}
              value={signUpData.email}
              onChange={onEmailChangeHandler}
              helperText={error.email ? "Please enter a valid email" : null}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <MaterialUiPhoneNumber
              size="small"
              defaultCountry={"in"}
              label="Phone "
              required
              fullWidth
              className={css.textFields}
              variant="outlined"
              onChange={(value: any) =>
                setSignUpData({
                  ...signUpData,
                  phone: value,
                })
              }
              value={signUpData.phone}
            ></MaterialUiPhoneNumber>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={signUpData.password}
              onChange={handlePasswordChange}
              error={error.password}
              required
              label="password"
              className={css.textFields}
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type={showPassword ? "text" : "password"}
              value={signUpData.confirmPassword}
              error={error.confirm}
              onChange={handleConfirmPasswordChange}
              required
              label="password"
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className={css.loginButtonContainer}>
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
                  onClick={onSubmitHandler}
                  variant="contained"
                  disabled
                  fullWidth
                  className={css.loginButtonDisabled}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={onSubmitHandler}
                  variant="contained"
                  fullWidth
                  className={css.loginButton}
                >
                  Submit
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RegisterComponent;
