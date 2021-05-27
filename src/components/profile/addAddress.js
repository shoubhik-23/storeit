import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Message from "../../common/message";
import { addAddress } from "../../service/dataService";

function AddAddress(props) {
  const [openMessage, setOpenMessage] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [region, setRegion] = useState(props.location.state.region || "");
  const [state, setState] = useState(props.location.state.state || "");
  const [details, setDetails] = useState(props.location.state.detail || "");
  const [pin, setPin] = useState(props.location.state.pin || "");
  const history = useHistory();
  console.log(history);

  const selectRegion = (e) => {
    setRegion(e.target.value);
  };
  const selectState = (e) => {
    setState(e.target.value);
  };
  const detailsHandler = (e) => {
    setDetails(e.target.value);
  };
  const pinChangeHandler = (event) => {
    if (event.target.value.length === 6) {
      setPin(event.target.value);
      getLocation(event.target.value);
    } else if (event.target.value.length > 6) {
      return null;
    } else {
      setPin(event.target.value);
    }
  };
  const onSubmitHandler = () => {
    addAddress({
      pin: pin,
      region: region,
      state: state,
      detail: details,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOpenMessage(true);
        if (data.message === "success") {
          setError(false);
          setMessage("Address Updated");
        } else {
          setError(true);
          setMessage("Something Went Wrong!");
        }
      })

      .catch((err) => console.log(err));
  };
  const getLocation = (pin) => {
    fetch(`https://api.postalpincode.in/pincode/${pin}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        setRegion(data[0].PostOffice[0].District);
        setState(data[0].PostOffice[0].State);
      })
      .catch((err) => console.log(err));
  };
  const handleClose = () => {
    setOpenMessage(false);
    history.push("/profile");
  };
  return (
    <Grid container style={{ justifyContent: "center", marginTop: 80 }}>
      <Grid item xs={10} sm={6} md={4} style={{ justifyContent: "center" }}>
        <Paper
          elevation={3}
          style={{
            padding: "10px 10px",
            backgroundColor: "rgb(255, 255, 255,0.5)",
          }}
        >
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Typography style={{ fontSize: 20, fontWeight: 600 }}>
                {props.location.state.type === "add"
                  ? "Add Address"
                  : "Update Address"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                size="small"
                fullWidth
                required
                id="outlined-read-only-input"
                label="Pincode"
                type="Number"
                value={pin}
                onChange={pinChangeHandler}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                size="small"
                fullWidth
                required
                id="outlined-read-only-input"
                label="Region"
                value={region}
                onChange={selectRegion}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                size="small"
                fullWidth
                required
                id="outlined-read-only-input"
                label="State"
                value={state}
                onChange={selectState}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Full Address Details"
                required
                fullWidth
                multiline
                rowsMax={4}
                value={details}
                onChange={detailsHandler}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {!pin || !state || !region || !details ? (
                <Button
                  disabled
                  style={{ backgroundColor: "grey", color: "white" }}
                  color="secondary"
                  variant="contained"
                >
                  {props.location.state.type === "add" ? "Add " : "Update"}
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: "#419168", color: "white" }}
                  disabled={!pin || !state || !region || !details}
                  color="secondary"
                  variant="contained"
                  onClick={onSubmitHandler}
                >
                  {props.location.state.type === "add" ? "Add " : "Update"}
                </Button>
              )}
              <Message
                open={openMessage}
                success={!error}
                handleClose={handleClose}
                message={message}
              ></Message>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddAddress;
