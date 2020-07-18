import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import SelectLanguage from "./SelectLanguage";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import SettingsIcon from "@material-ui/icons/Settings";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import HdIcon from "@material-ui/icons/Hd";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Music from "../music/Music";
import MessageIcon from "@material-ui/icons/Message";
import { TranslationContext } from "../contexts/TranslationContext";
import EasyBuyLogo from "../images/easy-buy-logo.png";
import VideoCallIcon from "@material-ui/icons/VideoCall";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const sideNavIcons = {
  Music: MusicNoteIcon,
  Movies: HdIcon,
  Messages: MessageIcon,
  Conference: VideoCallIcon,
};

const sideNavMenu = [
  { name: "Music", url: "/music" },
  { name: "Movies", url: "/movies" },
  { name: "Messages", url: "/chat" },
  { name: "Conference", url: "/conference" },
];

export default ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { t } = useContext(TranslationContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img
                src={EasyBuyLogo}
                style={{
                  height: "75px",
                  width: "130px",
                }}
                alt={t("app.title")}
              />
            </Link>

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: 400,
                width: "100%",
              }}
            >
              <SelectLanguage />

              <Link to="/notifications" style={{ color: "white" }}>
                <NotificationsIcon />
              </Link>
              <Link to="/settings" style={{ color: "white" }}>
                <SettingsIcon />
              </Link>
              <Link to="/cart" style={{ color: "white" }}>
                <ShoppingCartIcon />
              </Link>
              <Link to="/" style={{ color: "white" }}>
                Logout
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {sideNavMenu.map(({ name, url }, index) => {
              const Icon = sideNavIcons[name];
              return (
                <ListItem button key={index}>
                  <Link to={url}>
                    <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
                  </Link>
                  <Link to={url}>
                    <ListItemText primary={name}></ListItemText>
                  </Link>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </>
  );
};
