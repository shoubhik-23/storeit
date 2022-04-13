import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { Drawer, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../containers/home/actions";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Bookmark, ShoppingCart, Search } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";

import css from "./style.module.css";
import * as authActions from "../containers/login/actions";
import { Images } from "../utils/Images";

const NavigationComponent = () => {
  const history = useHistory();
  const store: any = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const { home, profile } = store;
  const { login } = profile;
  const { products } = home;
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
    }

    dispatch(actions.updateSearchResult(temp));
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
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
    if (type == "profile") {
      history.push("/profile");
    } else if (type == "orders") {
      history.push("/orders");
    } else if (type == "login") {
      history.push("/login");
    } else if (type == "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("userid");

      dispatch(authActions.logoutUser());
      history.push("/");
    }
    handleCloseUserMenu();
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
            <div>sdfs</div>
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
          <ShoppingCart
            className={css.cartLogo}
            onClick={() => history.push("/cart")}
          ></ShoppingCart>
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
