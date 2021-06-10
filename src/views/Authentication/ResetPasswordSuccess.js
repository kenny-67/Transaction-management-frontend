import React, { useEffect } from "react";
import { authFromVariants } from "../../config/animation";
import { Card, CardBody, Col } from "reactstrap";
import { motion } from "framer-motion";

function ResetPasswordSuccess(props) {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/auth/login");
    }, 5000);
  }, [props.history]);
  return (
    <>
      <Col lg="6" md="8">
        <motion.div
          variants={authFromVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center mb-4">
                <h1>
                  Password reset confirmed! You will be redirected to login...
                </h1>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </Col>
    </>
  );
}

export default ResetPasswordSuccess;
