import React, { useState } from "react";
import { motion } from "framer-motion";

import githubLogo from "../../assets/img/icons/common/github.svg";
import googleLogo from "../../assets/img/icons/common/google.svg";

import { login } from "../../network/AxiosApi";

import { authFromVariants } from "../../config/animation";

// reactstrap components
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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
    }

    const response = await login(email, password);
    const { data } = response;
    console.log("login data ===========>", data);
    if (data.success) {
      setError("");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.isAdmin) {
        props.history.push("/admin");
      } else {
        props.history.push("/employee");
      }
    } else {
      setPassword("");
      setError(data.msg);
    }
  };

  return (
    <>
      <React.Fragment>
        <Col lg="5" md="7">
          <motion.div
            variants={authFromVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
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
                  <small>Or sign in with credentials</small>
                </div>
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
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  {error ? (
                    <div className="text-muted font-italic">
                      <small>
                        error:{" "}
                        <span className="text-red font-weight-700">
                          {error}
                        </span>
                      </small>
                    </div>
                  ) : null}
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={handleLogin}
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  onClick={() => props.history.push("/auth/reset-password")}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  onClick={() => props.history.push("/auth/register")}
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </motion.div>
        </Col>
      </React.Fragment>
    </>
  );
}

export default Login;
