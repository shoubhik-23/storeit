import { Height } from "@material-ui/icons";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Logo from "../assets/images/Carousel1.jpg";
import Logo2 from "../assets/images/carousel2.jpg";
import Logo3 from "../assets/images/carousel3.jpg";
import Logo4 from "../assets/images/carousel4.jpg";
function CarouselComponent() {
  return (
    <Carousel
      showStatus={false}
      showIndicators={false}
      infiniteLoop
      autoPlay
      interval={2000}
      showThumbs={false}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={Logo}
          alt="logo"
        ></img>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={Logo4}
          alt="logo"
        ></img>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={Logo2}
          alt="logo"
        ></img>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={Logo3}
          alt="logo"
        ></img>
      </div>
    </Carousel>
  );
}

export default CarouselComponent;
