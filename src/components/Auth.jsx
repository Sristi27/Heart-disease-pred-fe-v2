import GoogleLogin from "react-google-login";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Auth = () => {
  const clientId =
    "893518889771-8rrmcfsksof02js275v6qosubdjqufun.apps.googleusercontent.com";

  const history = useHistory();
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : ""
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
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
        console.log(res);
        setLoginData(res);
        localStorage.setItem("loginData", JSON.stringify(res.user));
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    history.push("/");
  };

  return (
    <>
      {loginData ? (
        <>
          <Link
            to={{ pathname: `/checkup/${loginData._id}` }}
            style={{ textDecoration: "none" }}
          >
            <Button style={{ color: "white" }} align='center'>Checkup</Button>
          </Link>
          <Link
            to={{ pathname: `/history/${loginData._id}` }}
            style={{ textDecoration: "none" }}
          >
            <Button style={{ color: "white" }}>History</Button>
          </Link>
          <IconButton aria-label="login" onClick={() => handleLogout()} size="small">
            <LogoutIcon style={{ color: "white" }} />
          </IconButton>
        </>
      ) : (
        <span align="right">
          <GoogleLogin
          clientId={clientId}
          buttonText="Log in with Google"
          // buttonText={
          //   <>
          //   <IconButton aria-label="login" onClick={() => handleLogout()} size="small">
          //   <LogoutIcon style={{ color: "white" }} />
          // </IconButton>
          // </>
          // }
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
        </span>
      )}
    </>
  );
};

export default Auth;
