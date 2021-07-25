import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//network
import { getAllDebtor } from "../../../network/AxiosApi";

//reactstrap import
import { Container, Row } from "reactstrap";

function Debtors() {
  const [Debtors, setDebtors] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const buttonPath = user.isAdmin
    ? "/admin/create-order"
    : "/employee/create-order";

  useEffect(() => {
    const getDebtorsCall = async () => {
      const { data } = await getAllDebtor();
      setDebtors(data.data);
      console.log(data);
    };

    getDebtorsCall();
  }, []);

  const tableData = {
    tableName: "Debtors tables",
    product: Debtors,
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
  return (
    <>
      <Container className="mt--7" fluid>
        <motion.div
          variants={genericAdminVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
        >
          <Row>
            <ItermTable
              tableData={tableData}
              buttonName="Back"
              path="/admin/orders"
              hasButton
              // filter
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Debtors;
