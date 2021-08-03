import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//reactstrap import
import {
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Col,
  Spinner,
  Alert,
  FormGroup,
  Button,
} from "reactstrap";

//network
import { clearDebt, getAllDebtor } from "../../../network/AxiosApi";

function Debtors() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amountOwed, setAmountOwed] = useState("");
  const [paymentType, setPaymentType] = useState("CASH");
  const [debtId, setDebtId] = useState("CASH");

  const tableData = {
    tableName: "Debtors Table",
    tableHead: [
      "Debt Id",
      "First Name",
      "Last Name",
      "Phone Number",
      "Email",
      "Address",
      "Order Id",
      "Amount Owed",
      "Date Of Order",
    ],
  };

  const toggle = () => setShowModal(!showModal);

  const handleDebt = (obj) => {
    if (obj.amountOwed > 0) {
      setFirstName(obj.firstName);
      setLastName(obj.lastName);
      setEmail(obj.email);
      setAmountOwed(obj.amountOwed);
      setPhoneNumber(obj.phoneNumber);
      setDebtId(obj._id);
      setShowModal(true);
    }
  };

  const handleDebtorsOrder = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const redirectURL = user.isAdmin
      ? "http://localhost:3000/admin/debtors"
      : "http://localhost:3000/employee/orders";
    const reqObj = {
      amountOwed,
      orderType: paymentType,
      debtorId: debtId,
      amountPaid: amountOwed,
      redirectURL,
    };
    const { data } = await clearDebt(reqObj);
    if (paymentType === "CARD") {
      if (data.success) {
        setLoading(false);
        setShowModal(false);
        const redirectLink = data.message.data.link;
        window.location.href = redirectLink;
      }
    } else {
      setLoading(false);
      setShowModal(false);
      window.location.reload(false);
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
          <Modal isOpen={showModal} toggle={toggle}>
            <Row>
              {/* <Alert
                  color="warning"
                  style={{ margin: "0 auto" }}
                  isOpen={modalAlert}
                  toggle={onModalAlertDismiss}
                >
                  {message}
                </Alert> */}
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
                          value={firstName}
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
                          value={lastName}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Email
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="text"
                          name="email"
                          value={email}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Phone Number
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="number"
                          name="phoneNumber"
                          value={phoneNumber}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Amount Owed
                        </label>
                        <Input
                          className="form-control-alternative"
                          type="number"
                          name="amountOwed"
                          value={amountOwed}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Payment Type
                        </label>
                        <Input
                          type="select"
                          name="selectMulti"
                          id="selectMulti"
                          onChange={(e) => setPaymentType(e.target.value)}
                          value={paymentType}
                        >
                          <option>CASH</option>
                          <option>CARD</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            </ModalBody>
            <ModalFooter>
              {loading ? (
                <Button color="primary" disabled>
                  <Spinner size="sm" />
                </Button>
              ) : (
                <Button color="primary" onClick={handleDebtorsOrder}>
                  Clear Debt
                </Button>
              )}{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            <ItermTable
              tableData={tableData}
              buttonName="Back"
              path="/admin/orders"
              hasButton
              rowOnClickFunction={handleDebt}
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Debtors;
