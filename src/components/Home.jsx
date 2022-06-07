import { Button, Grid, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import heart2 from "./../images/heart2.jpeg";
import Loader from "./Loader";
import SnackbarElem from "./Snackbar";

const Home = ({ loading, user }) => {
  const [errorMsg, setErrorMsg] = useState();
  const history = useHistory();

  const checkupClick = () => {
    if (localStorage.getItem("loginData"))
      history.push(`/checkup/${user._id}`);
    else {
      setErrorMsg("Please login first");
    }
  };
  return (
    <>
      {errorMsg && (
        <SnackbarElem sev="error" msg={errorMsg} clearMsg={setErrorMsg} />
      )}
      {loading && <Loader open={loading} />}
      {!loading && (
        <Box p={2} pt={4}>
          <Grid container justify="center" alignItems="center">
            <Grid item sm={12} lg={6}>
              <img src={heart2} className="image" alt="Home Screen" />
            </Grid>
            <Grid item sm={12} lg={6}>
              <h1 style={{ textDecoration: "underline" }}>Heart Seva</h1>
              <Box
                style={{
                  width: "70%",
                  margin: "40px auto",
                  fontSize: "20px",
                  lineHeight: "1.8em",
                }}
              >
                <Box mb={3}>Welcome to our Health Application.</Box>
                <Box mb={3}>
                  This application is for predicting chances of you having a
                  heart disease. Enter your medical details and we will do a
                  quick check and tell you about your chances of having a heart
                  disease. Go ahead to the checkup section and avail our
                  services.
                </Box>
                <Box>
                  <b>Stay Safe , Stay Healthy!</b>
                </Box>
              </Box>
              {user && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={checkupClick}
                >
                  Checkup
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default Home;
