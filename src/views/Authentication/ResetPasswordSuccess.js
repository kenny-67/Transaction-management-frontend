import React, { useEffect } from "react";

import { Card, CardBody, Col } from "reactstrap";

function ResetPasswordSuccess(props) {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/auth/login");
    }, 5000);
  }, [props.history]);
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center mb-4">
              <h1>
                Password reset confirmed! You will be redirected to login...
              </h1>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default ResetPasswordSuccess;
