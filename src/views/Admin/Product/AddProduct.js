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
import { createProduct, getAllStore } from "../../../network/AxiosApi";

function AddProduct() {
  const [FormInfo, setFormInfo] = useState({
    productName: "",
    quantity: "",
    sellingPrice: "",
    originalPrice: "",
    description: "",
    dateOfPurchase: "",
    storeId: "",
  });
  const [Store, setStore] = useState([]);

  useEffect(() => {
    const getStoreCall = async () => {
      const response = await getAllStore();
      setStore(response.data.stores);
    };
    getStoreCall();
  }, []);

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
    let storeId;
    Store.forEach((item) => {
      if (item.storeName === FormInfo.storeId) {
        storeId = item._id;
      }
    });
    const response = await createProduct({ ...FormInfo, storeId });
    if (response.data.success) {
      setFormInfo({
        productName: "",
        quantity: "",
        sellingPrice: "",
        originalPrice: "",
        description: "",
        dateOfPurchase: "",
        storeId: "",
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
                      <h3 className="mb-0">Product information</h3>
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
                              Product Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              type="text"
                              name="productName"
                              value={FormInfo.productName}
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
                              Date of purchase
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              type="date"
                              name="dateOfPurchase"
                              value={FormInfo.date}
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
                              Store Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              placeholder="City"
                              type="select"
                              name="storeId"
                              value={FormInfo.storeId}
                              onChange={handleFormChange}
                            >
                              {Store.map((item, key) => (
                                <option key={key}>{item.storeName}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Quantity
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-country"
                              type="number"
                              name="quantity"
                              value={FormInfo.quantity}
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
                              Selling price
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              type="number"
                              name="sellingPrice"
                              value={FormInfo.sellingPrice}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Cost Price
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              type="number"
                              name="originalPrice"
                              value={FormInfo.originalPrice}
                              onChange={handleFormChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <label>Product Description</label>
                        <Input
                          className="form-control-alternative"
                          rows="4"
                          type="textarea"
                          name="description"
                          value={FormInfo.description}
                          onChange={handleFormChange}
                        />
                      </FormGroup>
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

export default AddProduct;
