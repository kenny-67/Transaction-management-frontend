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
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../config/animation";
import { createOrder, getAllProduct } from "../../network/AxiosApi";


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
  const [show, toggleAmount] = useState(false);
  const [OrderList, setOrderList] = useState([]);
  const [Total, setTotal] = useState(0);
  const [AmountPaid, setAmountPaid] = useState(0);
  const [orderType, setorderType] = useState("");

  //alert state
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  //modal alert
  const [modalAlert, setModalAlert] = useState(false);

  //debtor information states
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");

  //Debtor information modal
  const [modal, setModal] = useState(false);

  const onModalAlertDismiss = () => setModalAlert(false);

  const onDismiss = () => setVisible(false);

  useEffect(() => {
    const getProductCall = async () => {
      const response = await getAllProduct();
      setProduct(response.data.data);
    };
    getProductCall();
  }, []);

  useEffect(() => {
    setTotal(0);
    OrderList.map((order) => {
      setTotal((prevState) => (prevState += order.price));
    });
  }, [OrderList]);

  //For the product select drop down
  const searchList = Product.map(({ productName, sellingPrice, _id }) => {
    return {
      value: `${productName}  ${sellingPrice} ${_id}`,
      label: productName,
    };
  });

  const handleAddProduct = () => {
    console.log(SelectedProduct);
    if (SelectedProduct && Quantity) {
      let price = +SelectedProduct.split(" ")[2] * Quantity;
      let newProduct = SelectedProduct.split(" ")[0];
      let productId = SelectedProduct.split(" ")[3];

      const orderObj = {
        productName: newProduct,
        quantity: Quantity,
        price: price,
        productId,
      };
      console.log(orderObj);
      setOrderList((prev) => [...prev, orderObj]);
      setSelectedProduct("");
      setQuantity(1);
      setClearSelect(true);
      setClearSelect(false);
    }
  };

  const handleDeleteProduct = (productToRemove) => {
    setOrderList((prev) =>
      prev.filter((product) => {
        return productToRemove !== product;
      })
    );
  };

  const checkAmount = (amountPaidByCustomer) => {
    if (show && amountPaidByCustomer < Total) {
      return false;
    }
    return true;
  };

  const getAmountPaid = () => {
    let amountPaidByCustomer;
    AmountPaid == 0
      ? (amountPaidByCustomer = Total)
      : (amountPaidByCustomer = AmountPaid);
    return amountPaidByCustomer;
  };

  const handleOrder = async () => {
    setorderType("CARD");

    const amountPaid = await getAmountPaid();

    const isComplete = await checkAmount(amountPaid);

    if (!isComplete) {
      setModal(!modal);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const redirectUrl = user.isAdmin
        ? "http://localhost:3000/admin/orders"
        : "http://localhost:3000/employee/orders";
      const { data } = await createOrder(
        OrderList,
        Total,
        redirectUrl,
        amountPaid,
        orderType
      );
      console.log(data);
      if (!data.success) {
        setVisible(true);
        setMessage(data.message);
      } else {
        const redirectLink = data.message.data.link;
        window.location.href = redirectLink;
      }
    }
  };

  const handleCashOrder = async () => {
    setorderType("CASH");
    const amountPaid = await getAmountPaid();
    const isComplete = await checkAmount(amountPaid);
    if (!isComplete) {
      setModal(!modal);
    } else {
      //hit cash paymemt end point
      const { data } = await createOrder(
        OrderList,
        Total,
        "",
        amountPaid,
        orderType
      );
      if (data.success) {
        setVisible(true);
        setMessage(
          "Order created successfully, you wil be redirected to the order page soon"
        );
        setOrderList([]);
      }
    }
  };

  const handleDebtorsOrder = async () => {
    const amountPaid = await getAmountPaid();
    if (!FirstName || !LastName || !Email || !PhoneNumber || !Address) {
      setMessage("all customers information are required");
      setModalAlert(true);
    }
    const customerDetail = {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      phoneNumber: PhoneNumber,
      address: Address,
    };
    if (orderType == "CASH") {
      //cash endpoint
      const { data } = await createOrder(
        OrderList,
        Total,
        "",
        amountPaid,
        orderType,
        customerDetail
      );
      if (data.success) {
        setModal(false);
        setVisible(true);
        setMessage(
          "Order created successfully, you wil be redirected to the order page soon"
        );
        setOrderList([]);

        //clear modal data
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
      }
    } else {
      //card endpoint

      const user = JSON.parse(localStorage.getItem("user"));
      const redirectUrl = user.isAdmin
        ? "http://localhost:3000/admin/orders"
        : "http://localhost:3000/employee/orders";
      const { data } = await createOrder(
        OrderList,
        Total,
        redirectUrl,
        amountPaid,
        orderType,
        customerDetail
      );
      if (!data.success) {
        setModalAlert(true);
        setMessage(data.message);
      } else {
        const redirectLink = data.message.data.link;
        window.location.href = redirectLink;
      }
    }
  };

  const toggle = () => setModal(!modal);

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
          <Modal isOpen={modal} toggle={toggle}>
            <Row>
              <Alert
                color="warning"
                style={{ margin: "0 auto" }}
                isOpen={modalAlert}
                toggle={onModalAlertDismiss}
              >
                {message}
              </Alert>
            </Row>
            <ModalHeader toggle={toggle}>Customer's Information</ModalHeader>
            <ModalBody>
              <Form>
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
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
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
                          value={LastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Address
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          name="address"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="9">
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
                          value={PhoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="12">
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
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleDebtorsOrder}>
                Place Order
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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
                    <Col
                      className="text-right"
                      xs="14"
                      style={{ marginLeft: "70%", marginTop: "-30px" }}
                    >
                      <Link to="/admin/debtors">
                        <Button color="primary" size="sm">
                          View Debtors
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
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {OrderList.map((product, key) => (
                                  <tr key={key}>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td
                                      className="fas fa-trash-alt"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleDeleteProduct(product)
                                      }
                                    ></td>
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
                          <span>
                            Set Amount{" "}
                            <input
                              type="checkbox"
                              onChange={(e) => toggleAmount(e.target.checked)}
                            />
                          </span>
                          {show && (
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                Amount Recieved
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-email"
                                type="number"
                                name="amount"
                                value={AmountPaid}
                                onChange={(e) => setAmountPaid(e.target.value)}
                              />
                            </FormGroup>
                          )}
                          <span
                            style={{
                              textAlign: "center",
                              marginLeft: "30%",
                            }}
                          >
                            <Button
                              style={{
                                marginTop: "20px",
                              }}
                              color="info"
                              onClick={handleOrder}
                              size="s"
                            >
                              Pay with Card
                            </Button>
                            <Button
                              style={{
                                marginTop: "20px",
                              }}
                              color="info"
                              onClick={handleCashOrder}
                              size="s"
                            >
                              Pay with Cash
                            </Button>
                          </span>
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
