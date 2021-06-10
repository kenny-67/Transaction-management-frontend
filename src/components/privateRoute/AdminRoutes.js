import React from "react";
import { Route, Redirect } from "react-router-dom";

function AdminRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") && localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default AdminRoutes;
