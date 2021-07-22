import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminPageLayoutVariants } from "../../config/animation";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { getAdminHeaderData } from "../../network/AxiosApi";

function AdminHeader() {
  const [Anylitycs, setAnylitycs] = useState({
    orders: 0,
    products: 0,
    employees: 0,
    stores: 0,
  });

  useEffect(() => {
    const apiCall = async () => {
      const { data } = await getAdminHeaderData();
      console.log(data);

      if (data.success) {
        setAnylitycs(data.data);
      } else {
        alert(data.error);
      }
    };

    apiCall();
  }, []);
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container fluid>
        <motion.div
          className="header-body"
          variants={AdminPageLayoutVariants}
          initial="hidden"
          animate="enter"
        >
          {/* Card stats */}
          <Row>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Employees
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {Anylitycs.employees}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> 3.48%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Stores
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {Anylitycs.stores}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i className="fas fa-chart-pie" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-danger mr-2">
                      <i className="fas fa-arrow-down" /> 3.48%
                    </span>{" "}
                    <span className="text-nowrap">Since last week</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Orders
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {Anylitycs.orders}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i className="fas fa-users" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-warning mr-2">
                      <i className="fas fa-arrow-down" /> 1.10%
                    </span>{" "}
                    <span className="text-nowrap">Since yesterday</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Products
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {Anylitycs.products}
                      </span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i className="fas fa-percent" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fas fa-arrow-up" /> 12%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}

export default AdminHeader;
