import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const { component: Component, path } = props;
  return (
    <Route
      path={path}
      render={(props) =>
        !(localStorage.getItem("token") && localStorage.getItem("user")) ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect to="/admin" />
          </>
        )
      }
    />
  );
}

export default AuthRoute;
