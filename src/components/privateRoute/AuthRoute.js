import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const { component: Component, path } = props;
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <Route
      path={path}
      render={(props) =>
        !token ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect to="/admin/index" />
          </>
        )
      }
    />
  );
}

export default AuthRoute;
