import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { API_POINT } from "../../constant/Api";

class Product extends React.Component {
  state = {
    data: this.props.location.state.data,
    description: this.props.location.state.data.description.split(";"),
  };
  render() {
    console.log(this.state.description);

    return (
      <Box style={{ padding: "10px 50px" }}>
        <Paper elevation={2} style={{ padding: "10px 10px" }}>
          <Grid container>
            <Grid item xs={12} md={6} style={{ border: "solid" }}>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Box style={{ height: 200, width: 200 }}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={`${API_POINT}/${this.state.data.image}`}
                    alt="productImage"
                  ></img>
                </Box>
              </Grid>
            </Grid>
            <Grid container item xs={12} md={6} style={{ border: "solid" }}>
              <Grid item xs={12}>
                <Typography
                  style={{ color: "red", fontSize: "5vh", fontWeight: 600 }}
                >
                  {" "}
                  ₹ {this.state.data.price}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {this.state.description.map((el, i) => (
                  <Box style={{ display: "flex" }}>
                    <div>&#9830;</div>
                    <Typography key={i} style={{ marginLeft: "1rem" }}>
                      {el.trim()}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button variant="contained" color="secondary">
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
}
export default Product;
