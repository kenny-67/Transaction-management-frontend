import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { confirmReset } from "../../network/AxiosApi";
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

function ConfirmPassword(props) {
  const { id } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const confirm = async () => {
    if (password !== confirmPassword) {
      setError("Passwords have to match");
      return;
    }
    const response = await confirmReset(id, password);
    const { data } = response;
    if (data.success) {
      props.history.push("/auth/reset-success");
    } else {
      setError(data.msg);
    }
  };
  return (
    <>
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
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={confirm}
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

export default ConfirmPassword;
