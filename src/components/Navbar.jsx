import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import navLogo from "./../images/navLogo.png";
import SnackbarElem from "./Snackbar";

export default function Navbar({setLoading}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" className="navbarLinks">
            <img
              alt="Heart Seva Logo"
              src={navLogo}
              height="58px"
              width="58px"
              style={{ borderRadius: "50%" }}
            />
          </Link>
          <Auth
            onError={setErrorMsg}
            onSuccess={setSuccessMsg}
            setLoading={setLoading}
          />
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        {errorMsg !== "" && (
          <SnackbarElem sev="error" msg={errorMsg} clearMsg={setErrorMsg} />
        )}
        {successMsg !== "" && (
          <SnackbarElem sev="success" msg={successMsg} clearMsg={setSuccessMsg} />
        )}
      </Box>
    </>
  );
}
