import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:theme.spacing(0)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginBottom:theme.spacing(0)
    
  },
  title: {
    flexGrow: 1,
    marginBottom:theme.spacing(0)
  },
  tool: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom:theme.spacing(0)
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.tool}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
          <Link to="/checkup" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Checkup
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
