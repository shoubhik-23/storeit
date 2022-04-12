import React from "react";
import ImageCard from "../ImageCard";

interface props {
  children?: any;
  height: any;
  width: any;
}

const AvatarWidget = (props: props) => {
  return (
    <>
      <div
        style={{
          width: "100vw",

          display: "flex",
          overflowX: "auto",
          justifyContent: "space-between",
        }}
      >
        {[...new Array(20)].map((el) => (
          <ImageCard
            imgSrc=""
            width={50}
            height={50}
            style={{ border: "1px solid", borderRadius: "50%" }}
          />
        ))}
      </div>
    </>
  );
};

export default AvatarWidget;
