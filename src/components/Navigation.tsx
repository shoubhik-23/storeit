import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { Badge, Drawer, Grid, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../containers/home/actions";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Bookmark,
  ShoppingCart,
  Search,
  AccountCircle,
  AccountBox,
  Home,
} from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";

import css from "./style.module.css";
import * as authActions from "../containers/login/actions";
import { Images } from "../utils/Images";
import { firebaseDB } from "../firebase/firebase_Config";
import { collection, getDocs, query, where } from "firebase/firestore";

const NavigationComponent = () => {
  const history = useHistory();
  const store: any = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const { home, profile } = store;
  const { login, userid, cart } = profile;
  const { products } = home;
  const cartCount = cart?.length;
  React.useEffect(() => {}, []);
  const onInputChangeHandler = (e: any) => {
    let temp: any[] = [];
    history.push("/search");
    const value: string = e.target.value;
    if (value) {
      temp = products.filter((el: any, i: number) => {
        return (
          el.name?.toLowerCase().indexOf(value.toLowerCase) !== -1 ||
          el.name?.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
    } else {
      history.push("/");
    }

    dispatch(actions.updateSearchResult(temp));
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenNavMenu = (event: any) => {
    setOpenDrawer(true);
  };
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setOpenDrawer(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const userMenuHandler = (type?: string) => {
    if (type === "profile") {
      history.push("/profile");
    } else if (type === "orders") {
      history.push("/orders");
    } else if (type === "login") {
      history.push("/login");
    } else if (type === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("userid");

      dispatch(authActions.logoutUser());
      history.push("/");
    }
    handleCloseUserMenu();
    handleCloseNavMenu();
  };
  const getCartCount = async () => {
    if (login) {
      console.log("starting");
      const firebaseDataBaseUserRef = collection(firebaseDB, "users");

      let loggedUser: any;

      const q1 = query(firebaseDataBaseUserRef, where("id", "==", userid));
      const userQuerySnapshot = await getDocs(q1);
      userQuerySnapshot.forEach((doc: any) => {
        loggedUser = doc.data();
      });
      let cart: any[] = loggedUser?.cart;
      console.log("Cc", cart);
      return cart.length;
    } else {
      console.log("rendereding");

      const cart: any[] = JSON.parse(localStorage.getItem("cart") as any);

      return cart.length;
    }
  };

  return (
    <AppBar position="static" style={{ position: "fixed", top: 0, zIndex: 2 }}>
      <Toolbar disableGutters>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={openDrawer} onClose={handleCloseNavMenu}>
            <Grid
              container
              spacing={2}
              style={{ maxWidth: "70vw" }}
              role="presentation"
              onClick={handleCloseNavMenu}
            >
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  backgroundColor: "#99e6ff",

                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <AccountCircle style={{ fontSize: 50, color: "silver" }} />
                <p style={{ fontSize: 25, opacity: 0.8 }}>
                  Hello&nbsp;
                  {localStorage.getItem("user_name")
                    ? localStorage.getItem("user_name")
                    : "Guest"}
                  !
                </p>
              </Grid>

              <Grid
                item
                container
                spacing={3}
                xs={12}
                style={{ paddingLeft: 15 }}
              >
                <Grid
                  item
                  xs={12}
                  onClick={() => history.push("/")}
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Home style={{ color: "#999966" }}></Home>
                  <p style={{ fontSize: 16, marginLeft: "0.5rem" }}>Home</p>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "left" }}
                  onClick={() => history.push("/profile")}
                >
                  <AccountBox style={{ color: "#999966" }}></AccountBox>
                  <p style={{ fontSize: 16, marginLeft: "0.5rem" }}>
                    My Account
                  </p>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "left" }}
                  onClick={() => history.push("/orders")}
                >
                  <Bookmark style={{ color: "#999966" }}></Bookmark>
                  <p style={{ fontSize: 16, marginLeft: "0.5rem" }}>
                    My Orders
                  </p>
                </Grid>

                {login ? (
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      className={css.loginButton}
                      size="small"
                      variant="contained"
                    >
                      Logout
                    </Button>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      className={css.loginButton}
                      size="small"
                      variant="contained"
                      onClick={() => userMenuHandler("login")}
                    >
                      Login
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Drawer>
        </Box>
        <Box
          sx={{
            width: { xs: 150, sm: 200 },
            height: { xs: 30, sm: 40 },
            paddingLeft: { sm: "10px" },
          }}
          onClick={() => history.push("/")}
        >
          <img className={css.logoImage} src={Images.logo} alt="logo"></img>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" }, flex: 1 }}>
          <InputBase
            fullWidth
            placeholder="Search…"
            className={css.inputBase}
            startAdornment={
              <InputAdornment position="start">
                <Search style={{ color: "white" }} />
              </InputAdornment>
            }
            onChange={onInputChangeHandler}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
        <Box sx={{ display: { xs: "flex", sm: "none" }, flex: 1 }}></Box>
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <Search className={css.searchLogo} />
        </Box>
        <Box>
          <Badge badgeContent={cartCount} color="secondary" overlap="circular">
            <ShoppingCart
              style={{
                padding: 0,
                boxSizing: "border-box",
              }}
              className={css.cartLogo}
              onClick={() => history.push("/cart")}
            ></ShoppingCart>
          </Badge>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: "20px" }}>
              <Avatar alt="Remy Sharp" />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => userMenuHandler("profile")}>
              <AccountBoxIcon style={{ color: "#999966" }}></AccountBoxIcon>
              <p className={css.userMenuText}> My Account </p>
            </MenuItem>

            <MenuItem onClick={() => userMenuHandler("orders")}>
              <Bookmark style={{ color: "#999966" }} />
              <p className={css.userMenuText}> My Orders </p>
            </MenuItem>
            {login ? (
              <MenuItem
                onClick={() => userMenuHandler("logout")}
                className={css.justifyContent}
              >
                <Button
                  className={css.loginButton}
                  size="small"
                  variant="contained"
                >
                  Logout
                </Button>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => userMenuHandler("login")}
                className={css.justifyContent}
              >
                <Button
                  className={css.loginButton}
                  size="small"
                  variant="contained"
                >
                  Login
                </Button>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavigationComponent;
