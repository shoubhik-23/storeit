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
import css from "./style.module.css";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<any>({
    email: false,
    password: false,
    phone: false,
    firstName: true,
    lastName: true,
  });

  const onEmailChangeHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const onPassChangeHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const signUpWithEmail = () => {
    dispatch(actions.signInUser(email, password));
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
                error={error.email}
                value={email}
                onChange={onEmailChangeHandler}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                className={css.textFields}
                label="Last Name"
                fullWidth
                size="small"
                error={error.email}
                value={email}
                onChange={onEmailChangeHandler}
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
              value={email}
              onChange={onEmailChangeHandler}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              className={css.textFields}
              label="Phone"
              fullWidth
              size="small"
              error={error.email}
              value={email}
              onChange={onEmailChangeHandler}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPassChangeHandler}
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
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPassChangeHandler}
              required
              label="password"
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
            <Box className={css.loginButtonContainer}>
              {!email || !password || error.email || error.password ? (
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
