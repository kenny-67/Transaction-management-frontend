import React, { useState } from "react";
import { forgotPassword } from "../../network/AxiosApi";
import { motion } from "framer-motion";
import { authFromVariants } from "../../config/animation";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";

import Toast from "react-bootstrap/Toast";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "Email sent! Check it to reset your password."
  );
  const [userID, setUserID] = useState(null);

  const sendEmail = async () => {
    const response = await forgotPassword(email);
    const { data } = response;
    if (data.success) {
      console.log(data);
      setToastMessage("click on this link to reset your password:");
      setUserID(data.userID);

      setShowToast(true);
    } else {
      setError(data.errors[0].msg);
    }
  };
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          minHeight: "100px",
          width: "35%",
          right: 10,
          bottom: 100,
          zIndex: 50,
        }}
      >
        <Toast
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide={false}
        >
          <Toast.Header>
            {/* <img
              style={{ height: "30px", width: "100px" }}
              src={require("assets/img/brand/argon-react.png").default}
              alt="..."
            /> */}
          </Toast.Header>
          <Toast.Body>
            {toastMessage}
            <a href={`http://localhost:3000/auth/confirm-password/${userID}`}>
              {`http://localhost:3000/auth/confirm-password/${userID}`}
            </a>
          </Toast.Body>
        </Toast>
      </div>
      <Col lg="5" md="7">
        <motion.div
          variants={authFromVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                {error ? (
                  <div className="text-muted font-italic">
                    <small>
                      error:{" "}
                      <span className="text-red font-weight-700">{error}</span>
                    </small>
                  </div>
                ) : null}
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={sendEmail}
                  >
                    Reset Password
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </motion.div>
      </Col>
    </>
  );
}

export default ResetPassword;
