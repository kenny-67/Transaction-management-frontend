import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const { component: Component, path } = props;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
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
            {user && user.isAdmin ? (
              <Redirect to="/admin/index" />
            ) : (
              <Redirect to="/employee/index" />
            )}
          </>
        )
      }
    />
  );
}

export default AuthRoute;
