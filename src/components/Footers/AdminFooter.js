import React from "react";

import { motion } from "framer-motion";

import { adminFooterVariants } from "../../config/animation";

// reactstrap components
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

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
              © 2018{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Creative Tim
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Creative Tim
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
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
