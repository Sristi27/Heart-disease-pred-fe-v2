import GoogleLogin from "react-google-login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomTooltip } from "./CustomTooltip";
import { Stack } from "@mui/material";
import "./../App.css"

const Auth = ({onError,onSuccess}) => {
  const clientId =
    "893518889771-8rrmcfsksof02js275v6qosubdjqufun.apps.googleusercontent.com";

   
  const history = useHistory();
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")) //lgged in
      : ""  //not logged in
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData);
    await fetch("http://localhost:5000/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("loginData", JSON.stringify(res.user)); 
        onSuccess("User logged in successfully");
        setLoginData(res.user);
        //name,email,_id->mongo_user_id
      })
      .catch((err) => onError("Login Failed. Please try again."));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    history.push("/");
  };

  return (
    <>
      {loginData ? (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Link className="navbarLinks" to={{ pathname: `/checkup/${loginData._id}` }}>
            <Button className="navbarBtn">Checkup</Button>
          </Link>
          <Link className="navbarLinks" to={{ pathname: `/history/${loginData._id}` }}>
            <Button className="navbarBtn">History</Button>
          </Link>
          <CustomTooltip title="Logout">
          <IconButton aria-label="login" onClick={() => handleLogout()} size="medium">
            <LogoutIcon className="navbarBtn"/>
          </IconButton>
          </CustomTooltip>
        </Stack>
      ) : (
          <GoogleLogin
          clientId={clientId}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      )}
    </>
  );
};

export default Auth;
