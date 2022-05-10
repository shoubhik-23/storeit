// @ts-nocheck

import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomeComponent from "./containers/home";
import LayoutComponent from "./containers/layout";
import AdminComponent from "./containers/admin/index";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "./containers/home/actions";
import ProductListComponent from "./containers/productList/index";
import ProductDetailsComponent from "./containers/productDetail";
import CartComponent from "./containers/cart";
import ProfileComponent from "./containers/profile";
import SearchComponent from "./containers/search";
import LoginComponent from "./containers/login/LoginComponent";
import RegisterComponent from "./containers/login/RegisterComponent";
import OrderComponent from "./containers/orders";

const App = () => {
  const dispatch = useDispatch();
  const { home, profile }: any = useSelector((store: any) => store);
  const { login } = profile;
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  useEffect(() => {
    settingApp();
  }, []);
  const settingApp = () => {
    dispatch(actions.getAllProducts());
    dispatch(actions.retrievingAppState());
  };
  console.log(login);
  return (
    <LayoutComponent>
      <Switch>
        <Route path={"/"} exact>
          <HomeComponent />
        </Route>
        <Route path={"/admin-panel"} exact>
          <AdminComponent />
        </Route>
        <Route path={"/products"} exact>
          <ProductListComponent />
        </Route>
        <Route path={"/product-detail"} exact>
          <ProductDetailsComponent></ProductDetailsComponent>
        </Route>
        <Route path={"/cart"} exact>
          <CartComponent />
        </Route>
        <Route path={"/profile"} exact>
          <ProfileComponent />
        </Route>
        <Route path={"/search"} exact>
          <SearchComponent />
        </Route>

        <Route path={"/orders"} component={OrderComponent}></Route>

        {!login && (
          <Route path={"/login"} exact>
            <LoginComponent />
          </Route>
        )}
        {!login && (
          <Route path={"/register"} exact>
            <RegisterComponent />
          </Route>
        )}
      </Switch>
    </LayoutComponent>
  );
};

export default App;
