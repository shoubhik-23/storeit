import React from "react";

interface props {
  children?: any;
  height?: any;
  width?: any;
  style?: any;
  imgSrc: string;
  maxHeight?: any;
}

const ImageCard = (props: props) => {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        maxHeight: props.maxHeight,
        ...props.style,
      }}
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          backgroundSize: "center",
          textAlign: "center",

          objectFit: "contain",
        }}
        src={props.imgSrc}
      ></img>
    </div>
  );
};

export default ImageCard;
