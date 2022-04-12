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
import { Drawer, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../containers/home/actions";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavigationComponent = () => {
  const history = useHistory();
  const store: any = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const { home } = store;
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

  return (
    <AppBar position="static" style={{ position: "fixed", top: 0, zIndex: 2 }}>
      <Toolbar disableGutters>
        <Box
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          onClick={() => history.push("/")}
        >
          <Typography variant="h6" noWrap component="div">
            LOGOss
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          onClick={() => history.push("/")}
        >
          <Typography variant="h6" noWrap component="div">
            LOGO
          </Typography>
        </Box>
        <Box style={{ flex: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            onChange={onInputChangeHandler}
          />
        </Box>
        <Box>
          <Link to="/cart">Cart</Link>
        </Box>
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavigationComponent;
