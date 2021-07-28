import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

function Employees() {
  const tableData = {
    tableName: "Employees Table",
    tableHead: [
      "Employee Id",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Employee Type",
      "Branch Id",
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
              buttonName="Add Employee"
              path="/admin/add-employee"
              hasButton
              // filter
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Employees;
