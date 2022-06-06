import GoogleLogin from "react-google-login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomTooltip } from "./CustomTooltip";
import { Stack } from "@mui/material";
import "./../App.css";

const Auth = ({onError,onSuccess,setLoading}) => {
  const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  
  const history = useHistory();
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")) //lgged in
      : ""  //not logged in
  );

  const handleFailure = (err) => {
    alert(err.details);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData);
    setLoading(true);
    await fetch(`${backendURL}/api/google-login`, {
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
        setLoginData(res.user);
        localStorage.setItem("loginData", JSON.stringify(res.user)); 
        setLoading(false);
        onSuccess("User logged in successfully");
        // history.push('/');
        //name,email,_id->mongo_user_id
      })
      .catch((err) => onError("Login Failed. Please try again."));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    history.push('/');
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
          <IconButton aria-label="logout" onClick={() => handleLogout()} size="medium">
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
