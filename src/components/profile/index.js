import {
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { Token } from "../../constant/Api";
import { getUser } from "../../service/dataService";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AccountBox } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { connect } from "react-redux";
import * as action from "../../store/action";

const EmptyProfile = (props) => {
  const history = useHistory();
  return (
    <Grid container spacing={3} style={{ marginTop: 60 }}>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Typography style={{ fontSize: 18, opacity: 0.7, fontWeight: 600 }}>
          Please Login to your account first.
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push("/login")}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

class ProfileComponent extends React.Component {
  state = {
    data: {},
  };
  componentDidMount() {
    getUser()
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.message === "success") {
          this.setState({ ...data });
        }
      });
  }
  logoutHandler = () => {
    localStorage.removeItem("shop_token");
    this.props.setCart();
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        {Token() ? (
          <Grid container style={{ justifyContent: "center", marginTop: 80 }}>
            <Grid item xs={11} sm={6}>
              <Paper elevation={3}>
                <Grid container>
                  {this.state.data.firstName ? (
                    <Grid
                      item
                      container
                      md={5}
                      style={{
                        backgroundColor: "#F8F8F7",
                        paddingBottom: 20,
                      }}
                    >
                      <Box
                        style={{
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton>
                              <AccountBox
                                style={{ fontSize: "8rem" }}
                              ></AccountBox>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              style={{ fontSize: 22, fontWeight: 600 }}
                            >
                              {this.state.data.firstName} &nbsp;
                              {this.state.data.lastName}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              opacity: 0.7,
                            }}
                          >
                            <Typography>
                              Customer Since{" "}
                              {moment(this.state.data.createdAt).format("YYYY")}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography style={{ fontSize: 15 }}>
                              {this.state.data.email}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography style={{ fontSize: 15 }}>
                              Phone : {this.state.data.phone || "NA"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      container
                      md={5}
                      style={{
                        backgroundColor: "#F8F8F7",
                        paddingBottom: 20,
                      }}
                    >
                      <Box
                        style={{
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton>
                              <AccountBox
                                style={{ fontSize: "8rem" }}
                              ></AccountBox>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              style={{ fontSize: 22, fontWeight: 600 }}
                            >
                              Personal Details
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  )}

                  <Grid container item md={7} style={{ padding: "20px 2rem" }}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Typography style={{ fontSize: 21, fontWeight: 600 }}>
                        Address Details
                      </Typography>

                      <EditIcon
                        fontSize="small"
                        style={{ color: "orange", cursor: "pointer" }}
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/profile/address",
                            state: {
                              ...this.state.data,
                            },
                          })
                        }
                      ></EditIcon>
                    </Grid>

                    {this.state.data.state ||
                    this.state.data.region ||
                    this.state.data.detail ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            margin: " 15px 0",
                          }}
                        >
                          <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            label="Country"
                            value="India"
                          ></TextField>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            margin: "15px 0",
                          }}
                        >
                          <TextField
                            size="small"
                            multiline
                            fullWidth
                            variant="outlined"
                            label="State"
                            value={this.state.data.state || "NA"}
                          ></TextField>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            margin: "15px 0",
                          }}
                        >
                          <TextField
                            size="small"
                            fullWidth
                            multiline
                            label="Region"
                            variant="outlined"
                            value={this.state.data.region || "NA"}
                          ></TextField>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            margin: "15px 0",
                          }}
                        >
                          <TextField
                            size="small"
                            fullWidth
                            multiline
                            variant="outlined"
                            label="Full Address"
                            value={this.state.data.detail || "NA"}
                          ></TextField>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            margin: "15px 0",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.logoutHandler}
                          >
                            LogOut
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <Grid
                        item
                        xs={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "#419168",
                            color: "white",
                            height: "5vh",
                          }}
                          onClick={() =>
                            this.props.history.push({
                              pathname: "/profile/address",
                              state: {
                                ...this.state.data,
                                type: "add",
                              },
                            })
                          }
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
        ) : (
          <EmptyProfile></EmptyProfile>
        )}
      </>
    );
  }
}
const mapDisptachToProps = (dispatch) => {
  return {
    setCart: () => dispatch(action.setCart()),
  };
};
export default connect(null, mapDisptachToProps)(ProfileComponent);
