import React from "react";
import NavigationComponent from "../../components/Navigation";
interface props {
  children: any;
}
const LayoutComponent = (props: props) => {
  return (
    <>
      <NavigationComponent />
      {props.children}
    </>
  );
};

export default LayoutComponent;
