import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//network
import { getAllEmployees } from "../../../network/AxiosApi";

function Employees() {
  const [Employees, setEmployees] = useState([]);

  useEffect(() => {
    const getProductFunction = async () => {
      const response = await getAllEmployees();
      const { data } = response;
    console.log(response)

      setEmployees(data.employees);
    };
    getProductFunction();
  }, []);
  const tableData = {
    tableName: "Employees tables",
    product: Employees,
    tableHead: ["Employee Id", "First Name", "Last Name", "Email", "Phone Number", "Employee Type","Branch Id"],
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
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Employees;
