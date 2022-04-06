import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar"; 
import { Link } from "react-router-dom"; 
import Auth from "./Auth";
import navLogo from './../images/navLogo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(0),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    marginBottom: theme.spacing(0),
  },
  tool: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(0),
  },
  innerDiv:{
    width:'400px',
    display:'flex',
    justifyContent:'space-evenly'
  }
}));

export default function Navbar() { 
  const classes = useStyles(); 
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.tool}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={navLogo} height="58px" width="58px" 
            style={{borderRadius:'50%'}}/>
          </Link>
          <div className={classes.innerDiv}>
          <Auth/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
