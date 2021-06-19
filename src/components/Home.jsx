import { Typography, Button ,Grid,Box } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import heart2 from "./../images/heart2.jpeg";

const Home = () => {
  return (
<Box p={2}>
    <Grid container
    justify="center"
    alignItems="center">
      <Grid item sm={12} lg={6}>
      <img src={heart2} class="image"/>
      </Grid>
      <Grid item sm={12} lg={6}>
      <h1>Heart Seva</h1>
          <div className="home-content">
            Welcome to our Health Application.
            <br/>
          This application is for predicting chances of you having a heart
          disease. Enter your medical details and we will do a quick check and
          tell you about your chances of having a heart disease. Go ahead to the
          checkup section and avail our services.
          <br />
          <br />
          <b>Stay Safe , Stay Healthy!</b>
        </div>
        <Link to="/checkup" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" size="big">
            Checkup
          </Button>
        </Link>
      </Grid>
      
    </Grid>
</Box>
  );
};

export default Home;
