import { Typography, Box, Paper, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ImageCard from "../ImageCard";
import css from "./style.module.css";

interface props {
  children?: any;
  width?: any;
  height?: any;
  data?: any;
  heading?: string;
}

const CardWidget = (props: props) => {
  const [items, setItems] = useState<any[]>(props.data);
  const history = useHistory();
  return (
    <Paper
      style={{ width: props.width, height: props.height, padding: "1rem" }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* <Paper
        elevation={5}
        style={{
          height: "100%",
          width: "100%",
          padding: "15px",
        }}
      > */}
        <Typography className={css.cardWidgetHeading}>
          {props.heading}
        </Typography>
        <Grid container>
          {items.map((el, i) => (
            <Grid
              item
              key={i}
              xs={items.length == 1 ? 12 : 6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  position: "relative",
                  paddingTop: "80%",
                  overflow: "hidden",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <ImageCard
                    imgSrc={el.imgSrc}
                    height={"100%"}
                    width={"100%"}
                  />
                </div>
              </div>
            </Grid>
          ))}
        </Grid>

        <Button
          style={{
            cursor: "pointer",
            textTransform: "none",
          }}
          onClick={() => history.push("/products")}
        >
          See All
        </Button>
        {/* </Paper> */}
      </Box>
    </Paper>
  );
};

export default CardWidget;
