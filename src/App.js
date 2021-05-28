import React, { useEffect } from "react";
import PrimarySearchAppBar from "./common/navbar";
import Home from "./components/home";
import { Redirect, Route, Switch } from "react-router-dom";
import Product from "./components/product/product";
import Login from "./components/login/login";
import Cart from "./components/cart";
import ProfileComponent from "./components/profile";
import SignUp from "./components/login/signup";
import AddAddress from "./components/profile/addAddress";
import "@fontsource/roboto";
import { Token } from "./constant/Api";
import Order from "./components/order";

function App() {
  let token = Token();
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [token]);
  console.log(token);

  return (
    <>
      <Route path="/" component={PrimarySearchAppBar}></Route>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/product" component={Product}></Route>
        {!token && <Route exact path="/login" component={Login}></Route>}

        {!token && <Route exact path="/signup" component={SignUp}></Route>}
        <Route exact path="/orders" component={Order}></Route>

        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/profile" component={ProfileComponent}></Route>
        <Route exact path="/profile/address" component={AddAddress}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </>
  );
}

export default App;
