import React, { useState } from "react";

import { dashboardVariants } from "../../config/animation";

import { motion } from "framer-motion";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// node.js library that concatenates classes (strings)
import classnames from "classnames";
import ItermTable from "../../components/Tables/ItermTable";

// // react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import { mainBar } from "../../variables/chart.js";

function Dashboard() {
  const [activeNav, setActivenav] = useState(1);
  const [chartData, setChartData] = useState("data1");
  const [store, setStore] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActivenav(index);
    setChartData((prevstate) => (chartData === "data1" ? "data2" : "data1"));
  };

  const stores = [{ storeName: "Store 1" }, { storeName: "Store 2" }];

  return (
    <>
      {/* <AdminHeader /> */}
      <Container className="mt--7" fluid>
        <motion.div
          variants={dashboardVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          {/* <Col>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              onClick={(e) => console.log(e.target.value)}
            >
              <DropdownToggle caret>Select Store</DropdownToggle>
              <DropdownMenu>
                {stores.map((store, key) => (
                  <DropdownItem
                    key={key}
                    onClick={() => setStore(store.storeName)}
                  >
                    {store.storeName}
                  </DropdownItem>
                ))}

                <DropdownItem>All</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col> */}
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 2,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line data={mainBar.data} options={mainBar.options} />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={mainBar.data}
                      options={mainBar.options}
                      height={3000}
                      width={200}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              {/* <ItermTable tableData={topSellingData} hasImage /> */}
            </Col>
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Dashboard;
