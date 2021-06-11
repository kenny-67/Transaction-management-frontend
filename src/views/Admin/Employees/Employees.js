import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//network
import { getAllStore } from "../../../network/AxiosApi";

function Employees() {
  const [Employees, setEmployees] = useState([]);

  useEffect(() => {
    const getProductFunction = async () => {
      const response = await getAllStore();
      const { data } = response;
      setEmployees(data.employees);
    };
    getProductFunction();
  }, []);
  const tableData = {
    tableName: "Employees tables",
    product: Employees,
    tableHead: ["Store Id", "Store Name", "Address"],
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
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Employees;
