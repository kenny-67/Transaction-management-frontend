import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
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
} from "reactstrap";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";
import { createStore, getAllStore } from "../../../network/AxiosApi";

function AddStores() {
  const [FormInfo, setFormInfo] = useState({
    storeName: "",
    email: "",
    address: "",
  });

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
    const response = await createStore({
      name: FormInfo.storeName,
      address: FormInfo.address,
      email: FormInfo.email,
    });
    if (response.data.success) {
      setFormInfo({
        storeName: "",
        email: "",
        address: "",
      });
    }
  };

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
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Store information</h3>
                    </Col>
                    <Col
                      className="text-right"
                      xs="14"
                      style={{ marginLeft: "90%", marginTop: "-30px" }}
                    >
                      <Link to="/admin/products">
                        <Button color="primary" size="sm">
                          back
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Input the required information
                    </h6>

                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Store Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              type="text"
                              name="storeName"
                              value={FormInfo.storeName}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              type="email"
                              name="email"
                              value={FormInfo.email}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="City"
                              type="textarea"
                              name="address"
                              value={FormInfo.address}
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
                      Create
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default AddStores;
