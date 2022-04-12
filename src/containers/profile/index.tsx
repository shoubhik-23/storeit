import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import SignUpComponent from "./SignUpComponent";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase/firebase_Config";
import LoginComponent from "../login/LoginComponent";
import css from "./style.module.css";
import { AccountBox, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as actions from "../login/actions";
import { useHistory } from "react-router-dom";
const ProfileComponent = () => {
  const store: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { login, userid }: any = store.profile;
  const [data, setData] = useState<any>({});
  useEffect(() => {
    fetchUserDetails();
  }, [userid]);
  const fetchUserDetails = async () => {
    const userDbRef = collection(firebaseDB, "users");
    const q = query(userDbRef, where("id", "==", userid));
    const userQuerySnapshot = await getDocs(q);

    userQuerySnapshot.forEach((doc: any) => {
      setData({
        ...doc.data(),
      });
    });
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    dispatch(actions.logoutUser());
    history.push("?");
  };
  // return (
  //   <div style={{ marginTop: 100 }}>
  //     <SignUpComponent />
  //     <LoginComponent />
  //   </div>
  // );

  console.log(data);
  if (!login) {
    return (
      <Grid container className={css.profileMainContainer}>
        <Grid item xs={12}>
          <Box className={css.justifyCenter}>
            <p className={css.loginText}>
              Please login to your account to view the details
            </p>
          </Box>
          <Box className={css.justifyCenter}>
            <Button onClick={() => history.push("/login")} variant="outlined">
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container className={css.profileMainContainer}>
        <Grid item xs={11} sm={6}>
          <Paper elevation={3}>
            <Grid container>
              {data?.firstName ? (
                <Grid item container md={5} className={css.leftContainer}>
                  <Box
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} className={css.justifyCenter}>
                        <IconButton>
                          <AccountBox style={{ fontSize: "8rem" }}></AccountBox>
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} className={css.justifyCenter}>
                        <p className={css.profileNameText}>
                          {data.firstName} &nbsp;
                          {data.lastName}
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className={css.justifyCenter}
                        style={{
                          opacity: 0.7,
                        }}
                      >
                        <p>
                          Customer Since {moment(data.since.ut).format("YYYY")}
                        </p>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <p className={css.profileEmailText}>{data.email}</p>
                      </Grid>
                      <Grid item xs={12} className={css.justifyCenter}>
                        <p className={css.phoneText}>
                          Phone : {data.phone || "NA"}
                        </p>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ) : (
                <Grid item container md={5} className={css.leftContainer}>
                  <Box
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} className={css.justifyCenter}>
                        <IconButton>
                          <AccountBox style={{ fontSize: "8rem" }}></AccountBox>
                        </IconButton>
                      </Grid>
                      <Grid item xs={12} className={css.justifyCenter}>
                        <p style={{ fontSize: 22, fontWeight: 600 }}>
                          Personal Details
                        </p>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}

              <Grid container item md={7} className={css.rightContainer}>
                <Grid item xs={12} className={css.addressHeadingContainer}>
                  <p className={css.addressHeadingText}>Address Details</p>

                  <Edit
                    fontSize="small"
                    style={{ color: "orange", cursor: "pointer" }}
                  ></Edit>
                </Grid>

                {data?.address?.state ||
                data?.address?.region ||
                data?.address?.fullAddress ? (
                  <>
                    <Grid item xs={12} className={css.addressFieldContainer}>
                      <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        label="Country"
                        value={data?.address.country}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} className={css.addressFieldContainer}>
                      <TextField
                        size="small"
                        multiline
                        fullWidth
                        variant="outlined"
                        label="State"
                        value={data.address?.state || "NA"}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} className={css.addressFieldContainer}>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        label="Region"
                        variant="outlined"
                        value={data.address?.region || "NA"}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} className={css.addressFieldContainer}>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        variant="outlined"
                        label="Full Address"
                        value={data.address?.fullAddress || "NA"}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} className={css.logoutContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={logoutHandler}
                      >
                        LogOut
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} className={css.justifyCenter}>
                    <Button
                      variant="contained"
                      size="small"
                      className={css.addAddressButton}
                    >
                      Add Address
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default ProfileComponent;
