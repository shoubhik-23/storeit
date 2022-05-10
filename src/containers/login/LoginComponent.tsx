import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import GoogleButton from "react-google-button";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "./actions";
import css from "./style.module.css";
import { useHistory, useLocation } from "react-router-dom";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>({ email: false, password: false });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const history = useHistory();
  console.log(location, history);
  const onEmailChangeHandler = (e: any) => {
    let value = e.target.value;
    setEmail(e.target.value);

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
  const onPassChangeHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const loginWithEmail = (type: string) => {
    dispatch(actions.loginUser(type, email, password, history));
  };
  const onSubmitHandler = (type: string) => {
    loginWithEmail(type);
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Container className={css.loginContainer} maxWidth="sm" fixed>
      <Paper className={css.loginPaper} elevation={4}>
        <Grid container>
          <Grid item xs={12}>
            <p className={css.loginHeading}>Login</p>
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
                  variant="contained"
                  disabled
                  fullWidth
                  className={css.loginButtonDisabled}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={() => onSubmitHandler("email")}
                  variant="contained"
                  fullWidth
                  className={css.loginButton}
                >
                  Login
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={css.loginButtonContainer}>
              <GoogleButton onClick={() => onSubmitHandler("google")} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <p className={css.signupText}>
              Dont have an account?{" "}
              <span onClick={() => history.push("/register")}>
                Sign up here
              </span>
            </p>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginComponent;
