import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const { component: Component, path } = props;

  console.log("reached the auth route");
  // localStorage.removeItem("token");
  // localStorage.removeItem("user");
  // console.log(`token =======> ${localStorage.getItem("token")}`);
  // console.log(`user =======> ${localStorage.getItem("user")}`);
  return (
    <Route
      path={path}
      render={(props) =>
        !(localStorage.getItem("token") && localStorage.getItem("user")) ? (
          <>
            {console.log(true)}
            <Component {...props} />
          </>
        ) : (
          <>
            {console.log(false)}
            <Redirect to="/admin" />
          </>
        )
      }
    />
  );
}

export default AuthRoute;
