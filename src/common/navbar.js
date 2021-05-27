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
import Logo from "../assets/images/logo7.png";
import clsx from "clsx";

import {
  AccountBox,
  Bookmark,
  CallToAction,
  Home,
  ShopOutlined,
  ShoppingBasketOutlined,
  ShoppingCart,
} from "@material-ui/icons";
import {
  Box,
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
  logo: {
    height: 30,
    cursor: "pointer",
    padding: 0,

    width: "20vh",
    [theme.breakpoints.up("sm")]: {
      height: 50,
      width: "36vh",
    },
  },
  cartLogo: {
    fontSize: 30,
    [theme.breakpoints.up("sm")]: {
      fontSize: 50,
    },
  },
  accountCircle: {
    display: "none",
    cursor: "pointer",
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
  const logoutHandler = () => {
    localStorage.removeItem("shop_token");
    localStorage.removeItem("user_name");
    history.push("/");
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
      <MenuItem
        onClick={() => {
          history.push("/orders");

          handleMenuClose();
        }}
      >
        My Orders
      </MenuItem>
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
            logoutHandler();
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
      spacing={2}
      style={{ maxWidth: "45vh" }}
      className={clsx({
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
        <AccountCircle
          className={classes.mobileAccountCircleccountCircle}
          style={{ fontSize: 50, color: "silver" }}
          onClick={handleProfileMenuOpen}
        />
        <Typography style={{ fontSize: 25, opacity: 0.8 }}>
          Hello&nbsp;
          {localStorage.getItem("user_name")
            ? localStorage.getItem("user_name")
            : "Guest"}
          !
        </Typography>
      </Grid>

      <Grid item container spacing={3} xs={12} style={{ paddingLeft: 15 }}>
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
          <Typography style={{ fontSize: 16, marginLeft: "0.5rem" }}>
            Home
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "left" }}
          onClick={() => history.push("/profile")}
        >
          <AccountBox style={{ color: "#999966" }}></AccountBox>
          <Typography style={{ fontSize: 16, marginLeft: "0.5rem" }}>
            My Account
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "left" }}
          onClick={() => history.push("/orders")}
        >
          <Bookmark style={{ color: "#999966" }}></Bookmark>
          <Typography style={{ fontSize: 16, marginLeft: "0.5rem" }}>
            My Orders
          </Typography>
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
            <Button
              size="small"
              variant="contained"
              style={{ backgroundColor: "#00cc00", color: "white" }}
            >
              Login
            </Button>
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
            <Button
              size="small"
              variant="contained"
              style={{ backgroundColor: "#0088cc", color: "white" }}
            >
              SignUp
            </Button>
          </Grid>
        ) : null}
        {Token() ? (
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => {
              logoutHandler();
              handleMenuClose();
            }}
          >
            <Button
              size="small"
              variant="contained"
              style={{ backgroundColor: "#ff3300", color: "white" }}
            >
              LogOut
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );

  return (
    <div>
      <AppBar position="fixed">
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

          <Box className={classes.logo} onClick={() => history.push("/")}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={Logo}
              alt="logo"
            ></img>
          </Box>

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
              onClick={() => {
                history.push("/");
                dispatch({ type: "searchOn" });
              }}
              className={classes.mobileSearch}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="inherit"
              style={{ padding: 0, marginLeft: "2vh" }}
            >
              <Badge badgeContent={cartCount.length} color="secondary">
                <ShoppingCart
                  className={classes.cartLogo}
                  onClick={() => history.push("/cart")}
                ></ShoppingCart>
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              style={{ padding: 0, marginLeft: "2vh" }}
            >
              <AccountCircle
                className={classes.accountCircle}
                style={{ fontSize: 50 }}
                onClick={handleProfileMenuOpen}
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
