import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const loginData = localStorage.getItem("loginData");
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        loginData ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;