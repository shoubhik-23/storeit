import { Grid, Box, Button, Container, Paper, Divider } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import ImageCard from "../../components/ImageCard";
import Colors from "../../utils/colors";
import { GetScreenWidth } from "../../utils/getScreenWidth";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";

import css from "./style.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface props {}

const ProductDetailsComponent = () => {
  const location = useLocation();
  const { state }: any = location;
  const { data = {} } = state;
  const screenWidth = GetScreenWidth();
  return (
    <Container style={{ marginTop: 80, padding: 0 }} maxWidth="lg" fixed>
      <Paper className={css.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
              }}
            >
              <ImageCard
                width={"100%"}
                maxHeight={300}
                height={"100%"}
                imgSrc={data.imageUrl}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <p className={css.productName}>{data.name}</p>
              <Box style={{ display: "flex" }}>
                <p
                  style={{
                    flex: 0.8,
                    color: "blue",
                    fontWeight: 400,
                    fontSize: "1.1rem",
                  }}
                >
                  {data.brand}
                </p>
                <p style={{}}>
                  <StarIcon style={{ fontSize: 15, color: "green" }} />
                  <StarIcon style={{ fontSize: 15, color: "green" }} />

                  <StarIcon style={{ fontSize: 15 }} />
                  <StarIcon style={{ fontSize: 15 }} />
                </p>
              </Box>
              <Box style={{ display: "flex" }}>
                <p className={css.mrpKey}>MRP : </p>
                <p className={css.mrpValue}> &nbsp; &#8377; {data.price}</p>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "7px 0",
                }}
              >
                <p className={css.priceKey}>Price : </p>
                <p className={css.priceValue}>&nbsp; &#8377; {data.discount}</p>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p className={css.youSaveKey}>You Save : </p>
                <p className={css.youSaveValue}>
                  &nbsp; &#8377;
                  {(parseFloat(data.price) - parseFloat(data.discount)).toFixed(
                    2
                  )}
                </p>
                <div className={css.badge}>
                  {(
                    ((parseFloat(data.price) - parseFloat(data.discount)) /
                      parseFloat(data.price)) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </div>
              </Box>
              <Divider style={{ marginTop: 20 }} />
              <Box>
                <p style={{ fontWeight: "bold" }}>About this item :</p>
                {data.description.map((el: any, i: any) => (
                  <p
                    className={css.description}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FiberManualRecordIcon
                      style={{ fontSize: 12, color: "grey", marginRight: 10 }}
                    />
                    {el}.
                  </p>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                startIcon={<ShoppingCartIcon />}
                style={{
                  backgroundColor: Colors.orange,
                  color: "white",
                  margin: "20px 0 10px 0",
                  padding: 10,
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailsComponent;
