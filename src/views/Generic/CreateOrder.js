import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Table,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../config/animation";
import { createOrder, getAllProduct } from "../../network/AxiosApi";
import SelectedProducts from "./SelectedProducts";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "yellow" : "black",
  }),
  menuList: (provided) => ({
    ...provided,
    height: "200px",
  }),
  input: (provided) => ({
    height: "40px",
    paddingTop: "8px",
  }),
};

function CreateOrder() {
  const user = JSON.parse(localStorage.getItem("user"));
  const buttonPath = user.isAdmin ? "/admin/orders" : "/employee/orders";

  const [Product, setProduct] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState("");
  const [Quantity, setQuantity] = useState(1);

  const [clearSelect, setClearSelect] = useState(false);

  const [OrderList, setOrderList] = useState([]);
  const [Total, setTotal] = useState(0);
  useEffect(() => {
    const getProductCall = async () => {
      const response = await getAllProduct();
      setProduct(response.data.products);
    };
    getProductCall();
  }, []);

  const searchList = Product.map(({ productName, sellingPrice }) => {
    return {
      value: `${productName}  ${sellingPrice}`,
      label: productName,
    };
  });

  useEffect(() => {
    setTotal(0);
    OrderList.map((order) => {
      setTotal((prevState) => (prevState += order.price));
    });
  }, [OrderList]);

  const handleSubmit = async (e) => {
    console.log("here");
  };

  const handleAddProduct = () => {
    if (SelectedProduct && Quantity) {
      let price = +SelectedProduct.split(" ")[2] * Quantity;
      let newProduct = SelectedProduct.split(" ")[0];
      const orderObj = {
        productName: newProduct,
        quantity: Quantity,
        price: price,
      };
      setOrderList((prev) => [...prev, orderObj]);
      setSelectedProduct("");
      setQuantity(1);
      setClearSelect(true);
      setClearSelect(false);
    }
  };

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const redirectUrl = user.isAdmin
      ? "http://localhost:3000/admin/orders"
      : "http://localhost:3000/employee/orders";
    console.log(redirectUrl);
    const { data } = await createOrder(OrderList, Total, redirectUrl);

    console.log(data);

    if (!data.success) {
      alert(data.message.message);
    }

    const redirectLink = data.message.data.link;
    window.location.href = redirectLink;
  };

  return (
    <>
      <Container className="mt--7" fluid>
        <motion.div
          variants={genericAdminVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          style={{ borderBottom: "150px" }}
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
                      <Link to={buttonPath}>
                        <Button color="primary" size="sm">
                          back
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Product Name
                        </label>
                        <Select
                          options={searchList}
                          onChange={(e) => setSelectedProduct(e.value)}
                          placeholder="Search product..."
                          openMenuOnClick={false}
                          styles={customStyles}
                          clearSelect={clearSelect}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Quantity
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-email"
                          type="number"
                          name="quantity"
                          value={Quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="2">
                      <FormGroup>
                        <Button
                          style={{
                            marginTop: "25%",
                            textAlign: "center",
                          }}
                          color="info"
                          onClick={handleAddProduct}
                          size="s"
                        >
                          add
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="8" style={{ margin: "0 auto" }}>
                      {OrderList.length > 0 && (
                        <>
                          <Card style={{ maxHeight: "500px" }}>
                            <Table
                              className="align-items-center table-flush"
                              responsive
                            >
                              <thead className="thead-light">
                                <tr>
                                  <th>Product Name</th>

                                  <th>Quantity</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {OrderList.map((product, key) => (
                                  <tr key={key}>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            <div
                              style={{
                                marginLeft: "24px",
                                marginTop: "50px",
                              }}
                            >
                              Total: {Total}
                            </div>
                          </Card>
                          <Button
                            style={{
                              textAlign: "center",
                              marginTop: "10px",
                              marginLeft: "40%",
                            }}
                            color="info"
                            onClick={handleOrder}
                            size="s"
                          >
                            Place Order
                          </Button>
                        </>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default CreateOrder;
