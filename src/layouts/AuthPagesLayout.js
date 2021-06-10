import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

//components
import AuthNavbar from "../components/Navbars/AuthNavbar.js";
import AuthFooter from "../components/Footers/AuthFooter";

import routes from "../routes";

class AuthPagesLayout extends Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
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
  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <motion.div
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      transition={{ type: "spring", duration: 1, bounce: 0.7 }}
                    >
                      <h1 className="text-white">Welcome!</h1>
                      <p className="text-lead text-light">
                        Some brief description about the app, to be replaced
                        when i come up with an app name
                      </p>
                    </motion.div>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <AnimatePresence exitBeforeEnter>
                <Switch
                  location={this.props.location}
                  key={this.props.location.key}
                >
                  {this.getRoutes(routes)}
                  <Redirect from="*" to="/auth/login" />
                </Switch>
              </AnimatePresence>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default AuthPagesLayout;
