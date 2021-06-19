import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminFooter from "../components/Footers/AdminFooter";
import { AnimatePresence } from "framer-motion";
import AdminHeader from "../components/Headers/AdminHeader";

// reactstrap components
import { Container } from "reactstrap";

import logo from "../assets/img/brand/argon-react.png";

import routes from "../routes.js";

class EmployeePageLayout extends React.Component {
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/employee") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/employee/index",
            imgSrc: { logo },
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <AdminHeader />
          testing
          {/* <AnimatePresence exitBeforeEnter>
            <Switch
              location={this.props.location}
              key={this.props.location.key}
            >
              {this.getRoutes(routes)}
              <Redirect from="*" to="/auth/login" />
            </Switch>
          </AnimatePresence> */}
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default EmployeePageLayout;
