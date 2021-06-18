import { Typography, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import heart2 from "./../images/heart2.jpeg";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Typography variant="paragraph">
        <h1 style={{ textAlign: "center" }}>Heart Seva</h1>
        <div
          style={{
            width: "70%",
            margin: "10px auto",
            fontSize: "20px",
            lineHeight: "1.8em",
          }}
        >
          Welcome to out health application.
          <br />
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
      </Typography>
      <img src={heart2} height="450px" />
    </div>
  );
};

export default Home;
