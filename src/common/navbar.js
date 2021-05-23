import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import * as action from "../store/action";

import { useHistory } from "react-router-dom";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";

import {
  ShopOutlined,
  ShoppingBasketOutlined,
  ShoppingCart,
} from "@material-ui/icons";
import {
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { Token } from "../constant/Api";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  accountCircle: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  mobileAccountCircle: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      minWidth: 100,
    },
  },
  mobileSearch: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "none",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      display: "inline",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const visibleItems = useSelector((state) => state.visibleItems);
  const items = useSelector((state) => state.items);
  const [value, setValue] = useState("");

  const [state, setState] = React.useState({
    left: false,
  });
  const cartCount = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const searchHandler = (event) => {
    history.push("/");
    let value = event.target.value;
    setValue(value);

    dispatch(action.onSearchHandler(value, visibleItems, items));
  };
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  useEffect(() => {
    dispatch(action.setCart());
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push("/profile");
          handleMenuClose();
        }}
      >
        My account
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
      {!Token() ? (
        <MenuItem
          onClick={() => {
            history.push("/login");
            handleMenuClose();
          }}
        >
          Login
        </MenuItem>
      ) : null}
      {!Token() ? (
        <MenuItem
          onClick={() => {
            history.push("/signup");
            handleMenuClose();
          }}
        >
          SignUp
        </MenuItem>
      ) : null}
      {Token() ? (
        <MenuItem
          onClick={() => {
            history.push("/logout");
            handleMenuClose();
          }}
        >
          LogOut
        </MenuItem>
      ) : null}
    </Menu>
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Grid
      container
      style={{ maxWidth: "45vh" }}
      className={clsx({
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <AccountCircle
          className={classes.mobileAccountCircleccountCircle}
          style={{ fontSize: 50 }}
          onClick={handleProfileMenuOpen}
        />
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        Shoubhik Maji
      </Grid>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "center" }}
        onClick={() => history.push("/profile")}
      >
        My Account
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        My Orders
      </Grid>

      {!Token() ? (
        <Grid
          item
          xs={12}
          onClick={() => {
            history.push("/login");
            handleMenuClose();
          }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          Login
        </Grid>
      ) : null}
      {!Token() ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() => {
            history.push("/signup");
            handleMenuClose();
          }}
        >
          SignUp
        </Grid>
      ) : null}
      {Token() ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
          onClick={() => {
            history.push("/logout");
            handleMenuClose();
          }}
        >
          LogOut
        </Grid>
      ) : null}
    </Grid>
  );

  return (
    <div>
      <AppBar position="static" style={{ marginBottom: 40 }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleDrawer("left", true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>

          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => history.push("/")}
          >
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              fullWidth
              placeholder="Search…"
              onChange={(e) => {
                searchHandler(e);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div style={{ display: "flex" }}>
            <IconButton
              color="inherit"
              style={{ border: "solid" }}
              className={classes.mobileSearch}
            >
              <SearchIcon />
            </IconButton>

            <Badge badgeContent={cartCount.length} color="secondary">
              <ShoppingCart
                style={{ fontSize: 50 }}
                onClick={() => history.push("/cart")}
              ></ShoppingCart>
            </Badge>

            <AccountCircle
              className={classes.accountCircle}
              style={{ fontSize: 50 }}
              onClick={handleProfileMenuOpen}
            />
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
