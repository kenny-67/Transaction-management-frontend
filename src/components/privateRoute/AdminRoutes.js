import React from "react";
import { Route, Redirect } from "react-router-dom";

function AdminRoutes({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  console.log(user.isAdmin);
  return (
    <Route
      {...rest}
      render={(props) =>
        token && user.isAdmin ? (
          <Component {...props} />
        ) : token && !user.isAdmin ? (
          <Redirect to="/employee/index" />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default AdminRoutes;
