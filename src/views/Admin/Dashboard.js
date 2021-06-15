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
} from "reactstrap";

// node.js library that concatenates classes (strings)
import classnames from "classnames";
import ItermTable from "../../components/Tables/ItermTable";
// // javascipt plugin for creating charts
// import Chart from "chart.js"
// // react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";

function Dashboard() {
  const [activeNav, setActivenav] = useState(1);
  const [chartData, setChartData] = useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActivenav(index);
    setChartData((prevstate) => (chartData === "data1" ? "data2" : "data1"));
  };

  const Products = [
    {
      image:
        "https://res.cloudinary.com/kenny67/image/upload/v1618997286/vu6yv0ayhfhls08n4rsp.jpg",
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
    {
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
    {
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
    {
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
    {
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
    {
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
    {
      productName: "Head set",
      revenue: "100",
      quantity: "500",
      Action: "",
    },
  ];

  const topSellingData = {
    tableName: "Top Selling Products",
    product: Products,
    tableHead: [
      "Product Image",
      "Product Name",
      "Revenue",
      "Quantity Available",
      "Action",
    ],
  };

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
                    {/* <Line
                    data={chartExample1[state.chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  /> */}
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
                    {/* <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  /> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <ItermTable tableData={topSellingData} hasImage />
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Dashboard;
