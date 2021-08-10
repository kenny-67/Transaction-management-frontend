import React, { useState, useRef } from "react";

import { useReactToPrint } from "react-to-print";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";
import { generateReport } from "../../../network/AxiosApi";

function Report() {
  const componentRef = useRef(null);
  const [FormInfo, setFormInfo] = useState({
    reportType: "Sales Report",
    startDate: "",
    endDate: "",
  });

  const [reportDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false);

  //alert state
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onDismiss = () => setVisible(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const data = e.target.value;
    setFormInfo((prev) => ({
      ...prev,
      [name]: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FormInfo.startDate && !FormInfo.endDate) {
      setMessage("Please all input fields are required");
      setVisible(true);
      return;
    }

    const request = {
      ...FormInfo,
      reportType: "product",
    };

    const { data } = await generateReport(request);
    console.log(data);
    if (data.success) {
      setDetails(data.data);
      setHide(data.success);
    } else {
      setVisible(true);
      setMessage(data.message);
    }
  };

  const handleGeneratePdf = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
    copyStyles: true,
  });
  return (
    <>
      <Container className="mt--7" fluid>
        <motion.div
          variants={genericAdminVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row>
                    <Alert
                      color="warning"
                      style={{ margin: "0 auto" }}
                      isOpen={visible}
                      toggle={onDismiss}
                    >
                      {message}
                    </Alert>
                  </Row>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Report information</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Input the required information
                    </h6>

                    <div className="pl-lg-4">
                      <Row></Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Report Type
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="City"
                              type="select"
                              name="reportType"
                              value={FormInfo.reportType}
                              onChange={handleFormChange}
                            >
                              {/* <option>Sales Report</option>
                              <option>Stock Purchase Report</option> */}
                              <option>Product Report</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Start Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              type="date"
                              name="startDate"
                              value={FormInfo.startDate}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              End Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              type="date"
                              name="endDate"
                              value={FormInfo.endDate}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Button
                      style={{ marginLeft: "40%" }}
                      color="info"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="m"
                    >
                      Generate
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div>
            {show && (
              <>
                <div className="report" ref={componentRef}>
                  <Card
                    className="shadow report-card"
                    style={{ padding: "50px 30px", marginTop: "70px" }}
                  >
                    <div
                      className="report-header"
                      style={{
                        margin: "0 auto",
                        textAlign: "center",
                      }}
                    >
                      <h1>GOD'S WILL SUPERMARKET</h1>
                      <p>Product Report</p>
                    </div>
                    <div className="report-statistics">
                      <p style={{ lineHeight: "50%" }}>
                        <b>Product Count:</b> {reportDetails.productCount}
                      </p>
                      <p style={{ lineHeight: "70%" }}>
                        <b>Average Number of Product Sold:</b>{" "}
                        {reportDetails.totalProductsSold}
                      </p>
                      <p style={{ lineHeight: "70%" }}>
                        <b>total Revenue Generated:</b>{" "}
                        {new Intl.NumberFormat("yo-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(reportDetails.revenue)}
                      </p>
                    </div>
                    <div
                      className="report-table-1"
                      style={{ margin: "30px 0" }}
                    >
                      <div className="col">
                        <Card className="shadow">
                          <CardHeader className="border-0">
                            <h3 className="mb-0">Best Selling Products</h3>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Product Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Amount Sold</th>
                                <th scope="col">Revenue Generated</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportDetails &&
                                reportDetails.bestSelling.map(
                                  (product, key) => (
                                    <tr key={key}>
                                      {Object.entries(product).map(
                                        (item, key) => (
                                          <td key={key}>{item[1]}</td>
                                        )
                                      )}
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </Table>
                        </Card>
                      </div>
                    </div>
                    <div className="report-table-2">
                      <div className="col">
                        <Card className="shadow">
                          <CardHeader
                            className="border-0"
                            style={{ position: "relative" }}
                          >
                            <h3 className="mb-0">All Product Sold</h3>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Product Id</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Amount Sold</th>
                                <th scope="col">Revenue Generated</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportDetails &&
                                reportDetails.productSold.map(
                                  (product, key) => (
                                    <tr key={key}>
                                      {Object.entries(product).map(
                                        (item, key) => (
                                          <td key={key}>{item[1]}</td>
                                        )
                                      )}
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </Table>
                        </Card>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="report-button" style={{ margin: "30px" }}>
                  <Button color="info" size="m" onClick={handleGeneratePdf}>
                    Download
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </Container>
    </>
  );
}

// Report.Wrapper = styled.div`
//   .report {
//     margin-top: 70px;
//   }
//   .report-card {
//     padding: 50px 30px;
//     /* .report-header {
//       margin: 0 auto;
//       line-height: 100%;
//       p {
//         text-align: center;
//       }
//     } */
//     .report-statistics {
//     }
//   }
// `;

export default Report;
