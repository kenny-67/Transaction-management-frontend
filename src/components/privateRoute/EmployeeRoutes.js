import React from "react";
import { Route, Redirect } from "react-router-dom";

function EmployeeRoutes({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token && user ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
}

export default EmployeeRoutes;
