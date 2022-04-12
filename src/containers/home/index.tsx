import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import CarouselComponent from "../../components/carousel/Carousel";
import ImageCard from "../../components/ImageCard";
import AvatarWidget from "../../components/widgets/AvatarWidget";
import CardWidget from "../../components/widgets/CardWidget";
import HorizontalWidget from "../../components/widgets/HorizontalWidget";
import { GetScreenWidth } from "../../utils/getScreenWidth";
import { Images } from "../../utils/Images";
import csclass from "./index.module.css";
const HomeComponent = () => {
  let screenWidth = GetScreenWidth();

  return (
    <Grid className={csclass.container} container>
      <Grid item xs={12}>
        <CarouselComponent />
      </Grid>

      <Grid item xs={12} container style={{ justifyContent: "space-between" }}>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading={"Top Deals | Electronics"}
            data={[
              { title: "Laptop", imgSrc: Images.laptopWidgetIcon },
              { title: "Monitor", imgSrc: Images.monitorWidgetIcon },
              { title: "Watches", imgSrc: Images.watchWidgetIcon },
              { title: "Phones", imgSrc: Images.phoneWidgetIcon },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading={"Upto 20% off | Grocery"}
            data={[
              { title: "Dairy", imgSrc: Images.dairyWidgetIcon },
              { title: "Top Deals", imgSrc: Images.topDealsFreshWidgetIcon },
              { title: "Staple", imgSrc: Images.stapleWidgetIcon },
              {
                title: "Fruit and Vegetables",
                imgSrc: Images.fruitVegetableWidgetIcon,
              },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
        {/* {screenWidth == "xs" && (
          <Grid item xs={12}>
            <HorizontalWidget />
          </Grid>
        )} */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading={"Kitchen Essentials and Appliances"}
            data={[
              { title: "Laptop", imgSrc: Images.kitchen1Icon },
              { title: "Laptop", imgSrc: Images.kitchen2Icon },
              { title: "Laptop", imgSrc: Images.kitchen3Icon },
              { title: "Laptop", imgSrc: Images.kitchen4Icon },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading="Decorate your Garden!"
            data={[{ title: "Garden", imgSrc: Images.gardenIcon }]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container style={{ justifyContent: "space-between" }}>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading={"Get 10% off | Footwears "}
            data={[
              {
                title: "Footwear",
                imgSrc:
                  "https://firebasestorage.googleapis.com/v0/b/my-storeit.appspot.com/o/products%2Fcentrino.jpg?alt=media&token=795509e3-29e7-4f9f-a214-0fb1653f4077",
              },
              {
                title: "Footwear",
                imgSrc:
                  "https://firebasestorage.googleapis.com/v0/b/my-storeit.appspot.com/o/products%2Fasian.jpg?alt=media&token=7a417fda-cb12-4256-8a12-284f6b4ea32d",
              },
              {
                title: "Footwear",
                imgSrc:
                  "https://firebasestorage.googleapis.com/v0/b/my-storeit.appspot.com/o/products%2Fbourge.jpg?alt=media&token=df490b78-a22e-4c73-942d-08535b575e09",
              },
              {
                title: "Footwear",
                imgSrc:
                  "https://firebasestorage.googleapis.com/v0/b/my-storeit.appspot.com/o/products%2Fyahewomen.jpg?alt=media&token=00977d01-01b5-4f34-b860-e2c732f85d16",
              },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading="Trending in Fashion !"
            data={[
              { title: "Fashion", imgSrc: Images.fashion1Icon },
              { title: "fashion", imgSrc: Images.fashion2Icon },
              { title: "Fashion", imgSrc: Images.fashion3Icon },
              { title: "Fashion", imgSrc: Images.fashion4Icon },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
        {/* {screenWidth == "xs" && (
          <Grid item xs={12}>
            <HorizontalWidget />
          </Grid>
        )} */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          <CardWidget
            heading={"Revamp your Home in style"}
            data={[
              { title: "Home", imgSrc: Images.homeDecor1Icon },
              { title: "Home", imgSrc: Images.homeDecor2Icon },
              { title: "Home", imgSrc: Images.homeDecor3Icon },
              { title: "Home", imgSrc: Images.homeDecor4Icon },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          {/* <CardWidget
            data={[
              { title: "Laptop", imgSrc: Images.laptopWidgetIcon },
              { title: "Laptop", imgSrc: Images.monitorWidgetIcon },
              { title: "Laptop", imgSrc: Images.watchWidgetIcon },
              { title: "Laptop", imgSrc: Images.phoneWidgetIcon },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          /> */}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          className={csclass.cardWidgetContainer}
        >
          {/* <CardWidget
            data={[
              { title: "Laptop", imgSrc: Images.laptopWidgetIcon },
              { title: "Laptop", imgSrc: Images.monitorWidgetIcon },
              { title: "Laptop", imgSrc: Images.watchWidgetIcon },
              { title: "Laptop", imgSrc: Images.phoneWidgetIcon },
            ]}
            width={screenWidth == "xs" ? "100%" : "80%"}
          /> */}
        </Grid>
      </Grid>
      {/* {screenWidth !== "xs" && (
        <Grid item xs={12}>
          <HorizontalWidget />
        </Grid>
      )} */}
    </Grid>
  );
};

export default HomeComponent;
