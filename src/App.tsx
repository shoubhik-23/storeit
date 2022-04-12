import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomeComponent from "./containers/home";
import LayoutComponent from "./containers/layout";
import AdminComponent from "./containers/admin/index";
import { firebaseDB } from "./firebase/firebase_Config";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./containers/home/actions";
import ProductListComponent from "./containers/productList/index";
import ProductDetailsComponent from "./containers/productDetail";
import CartComponent from "./containers/cart";
import ProfileComponent from "./containers/profile";
import SearchComponent from "./containers/search";
import LoginComponent from "./containers/login/LoginComponent";
import RegisterComponent from "./containers/login/RegisterComponent";

const App = () => {
  const dispatch = useDispatch();
  const store = useSelector((stor: any) => stor);
  useEffect(() => {
    settingApp();
  }, []);
  const settingApp = () => {
    dispatch(actions.getAllProducts());
    dispatch(actions.retrievingAppState());
  };
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
        <Route path={"/login"} exact>
          <LoginComponent />
        </Route>
        <Route path={"/register"} exact>
          <RegisterComponent />
        </Route>
      </Switch>
    </LayoutComponent>
  );
};

export default App;
