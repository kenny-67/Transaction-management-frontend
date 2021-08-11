import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./index.css";

//routes
import AuthRoute from "./components/privateRoute/AuthRoute";
import AdminRoutes from "./components/privateRoute/AdminRoutes";
import EmployeeRoutes from "./components/privateRoute/EmployeeRoutes";

//layouts
import AuthPagesLayout from "./layouts/AuthPagesLayout";
import AdminPageLayout from "./layouts/AdminPagesLayout";
import EmployeePageLayout from "./layouts/EmployeePageLayout";
import NotFoundPage from "./components/Error/NotFoundPage";

import reportWebVitals from "./reportWebVitals";
import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <AdminRoutes path="/admin" component={AdminPageLayout} />
      <AuthRoute path="/auth" component={AuthPagesLayout} />
      <AuthRoute path="/" component={AuthPagesLayout} />
      <EmployeeRoutes path="/employee" component={EmployeePageLayout} />
      <NotFoundPage />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
