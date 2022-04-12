import { Box, Typography } from "@mui/material";
import React from "react";
import ImageCard from "../ImageCard";
interface props {
  width?: any;
  height?: any;
  style?: any;
}
const HorizontalWidget = (props: props) => {
  return (
    <>
      <Typography>Heading</Typography>
      <Box
        style={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
          overflowX: "auto",
        }}
      >
        {[...new Array(50)].map((el) => (
          <ImageCard
            imgSrc=""
            width={100}
            height={100}
            style={{ margin: "0 10px" }}
          />
        ))}
      </Box>
    </>
  );
};

export default HorizontalWidget;
