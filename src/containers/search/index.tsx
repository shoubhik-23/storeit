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
import { Images } from "../../utils/Images";
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
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <img width={50} src={Images.noResults} alt="noresult"></img>

        <p className={csclass.noResultsText}>Oops no results found!</p>
      </Grid>
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
              style={{ padding: "10px 10px" }}
              sm={4}
              md={3}
            >
              <Paper className={csclass.paper} square elevation={4}>
                <Box className={[csclass.boxContainer].join(" ")}>
                  <Box
                    className={csclass.imageBox}
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
                  <p className={csclass.price}>
                    &#8377; {parseFloat(el.price).toFixed(2)}
                  </p>
                  <p className={csclass.name}>{el.name}</p>
                </Box>
              </Paper>
            </Grid>
          ))
        : emptySearchResult()}
    </Grid>
  );
};

export default SearchComponent;
