import { Typography, Button, Grid, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heart2 from "./../images/heart2.jpeg";

const Home = () => {
  const [loginData, setLoginData] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("loginData");
    console.log(data);
    if (data) {
      setLoginData(JSON.parse(data));
    }
  }, []);
  return (
    <Box p={2}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "40px" }}
      >
        <Grid item sm={12} lg={6}>
          <img src={heart2} class="image" />
        </Grid>
        <Grid item sm={12} lg={6}>
          <h1 style={{ textDecoration: "underline" }}>Heart Seva</h1>
          <div className="home-content">
            Welcome to our Health Application.
            <br />
            This application is for predicting chances of you having a heart
            disease. Enter your medical details and we will do a quick check and
            tell you about your chances of having a heart disease. Go ahead to
            the checkup section and avail our services.
            <br />
            <br />
            <b>Stay Safe , Stay Healthy!</b>
          </div>
          {loginData && (
            <Link
              to={{ pathname: `/checkup/${loginData._id}` }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                style={{ marginTop: "20px" }}
              >
                Checkup
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
