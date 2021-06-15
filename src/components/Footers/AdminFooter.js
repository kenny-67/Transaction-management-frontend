import React from "react";

import { motion } from "framer-motion";

import { adminFooterVariants } from "../../config/animation";

// reactstrap components
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

function AdminFooter() {
  return (
    <>
      <div style={{ display: "block", width: "100%", height: "80px" }} />
      <motion.footer
        variants={adminFooterVariants}
        initial="hidden"
        animate="enter"
        className="footer"
      >
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2021{" "}
              <a className="font-weight-bold ml-1" href="/" target="_blank">
                KenTech
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem style={{ display: "flex", alignItems: "center" }}>
                <i className="fab fa-github" />

                <NavLink href="https://github.com/kenny-67" target="_blank">
                  Github
                </NavLink>
              </NavItem>
              <NavItem style={{ display: "flex", alignItems: "center" }}>
                <i className="fab fa-linkedin-in" />
                <NavLink
                  href="https://linkedin.com/in/kenneth-nnopu-b2539318b"
                  target="_blank"
                >
                  Linkedin
                </NavLink>
              </NavItem>
              <NavItem style={{ display: "flex", alignItems: "center" }}>
                <i className="fab fa-twitter" />
                <NavLink href="twitter.com/NnopuK?s=03" target="_blank">
                  Twitter
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </motion.footer>
    </>
  );
}

export default AdminFooter;
