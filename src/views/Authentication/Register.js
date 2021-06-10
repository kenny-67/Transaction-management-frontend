import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

import { authFromVariants } from "../../config/animation";

//Api
import { register } from "../../network/AxiosApi";
import { motion } from "framer-motion";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

//images
// import pageLogo from "../assets/img/brand/argon-react.png";
import githubLogo from "../../assets/img/icons/common/github.svg";
import googleLogo from "../../assets/img/icons/common/google.svg";

function Register() {
  const [toastMessage, setToastMessage] = useState(
    "Email sent! Check it to verify your account."
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [userID, setUserID] = useState(false);

  const registerUser = async () => {
    if (
      !(
        firstName &&
        lastName &&
        email &&
        password &&
        confirmPassword &&
        checkbox
      )
    ) {
      setError(
        "Make sure to fill all the inputs and agree to the privacy policy"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(process.env.API_BASE_URL);
    const response = await register(
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    );
    const { data } = response;
    if (!data.success) {
      setError(data.msg);
      return;
    }
    setUserID(data.userID);
    setError("");
    setPhoneNumber("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCheckbox(false);
    setShowToast(true);
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
          bottom: 80,
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
          delay={10000}
          autohide={false}
        >
          <Toast.Header>
            {/* <img
              style={{ height: "30px", width: "100px" }}
              src={pageLogo}
              alt="..."
            /> */}
          </Toast.Header>
          <Toast.Body>
            {toastMessage}
            <a href={`http://localhost:3000/auth/confirm-email/${userID}`}>
              {`http://localhost:3000/auth/confirm-email/${userID}`}
            </a>
          </Toast.Body>
        </Toast>
      </div>

      {/* main body */}
      <Col lg="6" md="8">
        <motion.div
          variants={authFromVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              {/* social media buttons for signup */}
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img alt="..." src={githubLogo} />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img alt="..." src={googleLogo} />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="First Name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-phone" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Phone Number"
                      type="number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        checked={checkbox}
                        onChange={() => setCheckbox(!checkbox)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    onClick={registerUser}
                    className="mt-4"
                    color="primary"
                    type="button"
                  >
                    Create account
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

export default Register;
