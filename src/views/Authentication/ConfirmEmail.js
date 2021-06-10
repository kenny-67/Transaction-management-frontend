import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmRegister } from "../../network/AxiosApi";
import { Card, CardBody, Col } from "reactstrap";
import { motion } from "framer-motion";
import { authFromVariants } from "../../config/animation";

const ConfirmEmail = (props) => {
  const { history } = props;
  const { id } = useParams();
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (!id) {
      setValid(false);
    } else {
      const runAsync = async () => {
        const response = await confirmRegister(id);
        const { data } = response;
        console.log(data);
        if (!data.success) {
          setValid(false);
        } else {
          setTimeout(() => {
            history.push("/auth/login");
          }, 5000);
        }
      };
      runAsync();
    }
  }, [id, history]);

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
                  {valid
                    ? "Email confirmed! You will be redirected to login..."
                    : "Something went wrong!"}
                </h1>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </Col>
    </>
  );
};

export default ConfirmEmail;
