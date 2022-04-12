import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import Colors from "../../utils/colors";
import csclass from "./style.module.css";

const SearchComponent = () => {
  const store = useSelector((state: any) => {
    return state;
  });
  const { home, profile } = store;
  const { login } = profile;
  const history = useHistory();
  const data = home.searchResults;

  const emptySearchResult = () => {
    return (
      <Box>
        <p>Oops no results found!</p>
      </Box>
    );
  };

  return (
    <Grid container className={csclass.container}>
      {data.length > 0
        ? data.map((el: any, i: number) => (
            <Grid
              key={i}
              item
              xs={6}
              className={csclass.alignCenter}
              style={{ padding: "10px 0" }}
              sm={4}
              md={3}
            >
              <Box className={[csclass.boxContainer].join(" ")}>
                <Paper
                  style={{
                    padding: "5px",
                  }}
                >
                  <Box
                    className={csclass.alignCenter}
                    style={{
                      height: 150,
                    }}
                    onClick={() =>
                      history.push("/product-detail", { data: el })
                    }
                  >
                    <ImageCard
                      width={"90%"}
                      imgSrc={el.imageUrl}
                      height={"100%"}
                      // maxHeight={300}
                    />
                  </Box>

                  <p className={csclass.brand}>{el.brand}</p>
                  <Typography className={csclass.price}>
                    {parseFloat(el.price).toFixed(2)}
                  </Typography>
                  <Typography noWrap>{el.name}</Typography>
                </Paper>
              </Box>
            </Grid>
          ))
        : emptySearchResult()}
    </Grid>
  );
};

export default SearchComponent;
