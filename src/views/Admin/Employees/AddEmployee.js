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
import {
  getAllWarehouse,
  getAllStore,
  register,
} from "../../../network/AxiosApi";

function AddEmployee() {
  const [FormInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmpassword: "",
    userType: "Store Employee",
    designationName: "",
  });
  const [warehouseList, setWarehouseList] = useState([]);
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const getIdCall = async () => {
      const userType = FormInfo.userType;
      const actualRequest =
        userType === "Store Employee" ? getAllStore : getAllWarehouse;
      const response = await actualRequest();

      if (response.status) {
        if (userType === "Store Employee") {
          await setStoreList(response.data.stores);
        } else {
          await setWarehouseList(response.data.warehouses);
        }
      }
    };
    getIdCall();
  }, [FormInfo.userType]);

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
    if (FormInfo.password !== FormInfo.confirmpassword) {
      alert("password do not match");
    }
    if (
      !FormInfo.firstName ||
      !FormInfo.lastName ||
      !FormInfo.email ||
      !FormInfo.password ||
      !FormInfo.designationName ||
      !FormInfo.userType
    ) {
      alert("all fields are required");
    }
    let id;
    let requestObject;
    if (FormInfo.userType === "Store Employee") {
      requestObject = {
        firstName: FormInfo.firstName,
        lastName: FormInfo.lastName,
        phoneNumber: FormInfo.phoneNumber,
        email: FormInfo.email,
        userType: FormInfo.userType,
        password: FormInfo.password,
        storeName: FormInfo.designationName,
      };
    }
    if (FormInfo.userType === "Warehouse Employee") {
      await warehouseList.forEach((warehouse) => {
        if (warehouse.warehouseName === FormInfo.designationName) {
          id = warehouse._id;
        }
      });
      requestObject = {
        firstName: FormInfo.firstName,
        lastName: FormInfo.lastName,
        phoneNumber: FormInfo.phoneNumber,
        email: FormInfo.email,
        userType: FormInfo.userType,
        warehouseId: id,
        password: FormInfo.password,
      };
    }
    const response = await register(requestObject);
    if (response.data.success) {
      setFormInfo({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        designationName: "",
        password: "",
        confirmpassword: "",
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
                      <h3 className="mb-0">Employee information</h3>
                    </Col>
                    <Col
                      className="text-right"
                      xs="14"
                      style={{ marginLeft: "90%", marginTop: "-30px" }}
                    >
                      <Link to="/admin/employees">
                        <Button color="primary" size="sm">
                          Back
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
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              name="firstName"
                              value={FormInfo.firstName}
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
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="text"
                              name="lastName"
                              value={FormInfo.lastName}
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
                              htmlFor="input-country"
                            >
                              Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="number"
                              name="phoneNumber"
                              value={FormInfo.phoneNumber}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
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
                              htmlFor="input-country"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="password"
                              name="password"
                              value={FormInfo.password}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">
                              Confirm Pasword
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              type="password"
                              name="confirmpassword"
                              value={FormInfo.confirmpassword}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">
                              User Type
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="select"
                              name="userType"
                              value={FormInfo.userType}
                              onChange={handleFormChange}
                            >
                              <option>Store Employee</option>
                              {/* <option>Warehouse Employee</option> */}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label className="form-control-label">
                              {FormInfo.userType === "Store Employee" ? (
                                <>Store Name</>
                              ) : (
                                <>Warehouse Name</>
                              )}
                            </label>
                            <Input
                              className="form-control-alternative"
                              type="select"
                              name="designationName"
                              value={FormInfo.designationName}
                              onChange={handleFormChange}
                            >
                              {FormInfo.userType === "Store Employee" ? (
                                storeList ? (
                                  storeList.map((store, key) => {
                                    return (
                                      <option key={key}>
                                        {store.storeName}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option>loading stores</option>
                                )
                              ) : warehouseList ? (
                                warehouseList.map((warehouse, key) => {
                                  return (
                                    <option key={key}>
                                      {warehouse.warehouseName}
                                    </option>
                                  );
                                })
                              ) : (
                                <option>loading warehouses</option>
                              )}
                            </Input>
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

export default AddEmployee;
