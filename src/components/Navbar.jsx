import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import navLogo from "./../images/navLogo.png";
import Snackbar from "./Snackbar";

export default function Navbar() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" className="navbarLinks">
            <img
              src={navLogo}
              height="58px"
              width="58px"
              style={{ borderRadius: "50%" }}
            />
          </Link>
          <Auth onError={setErrorMsg} onSuccess={setSuccessMsg} />
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        {errorMsg !== "" && <Snackbar sev="error" msg={errorMsg} clearMsg={setErrorMsg} />}
        {successMsg !== "" && <Snackbar sev="success" msg={successMsg} clearMsg={setSuccessMsg} />}
      </Box>
    </>
  );
}
