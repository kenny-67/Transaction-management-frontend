import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//network
import { getAllEmployees, getAllStore } from "../../../network/AxiosApi";

function Employees() {
  const [Employees, setEmployees] = useState([]);
  const [Stores, setStores] = useState([]);

  useEffect(() => {
    const getProductFunction = async () => {
      const response = await getAllEmployees();
      const storeResponse = await getAllStore();
      const { data } = response;

      console.log(response);

      setEmployees(data.employees);
      setStores(storeResponse.data.stores);
    };

    getProductFunction();
  }, []);

  let StoreNames = [];
  //extract Store name
  if (Stores.length > 0) {
    Stores.forEach((store) => {
      StoreNames.push(store.storeName);
    });
  }

  const tableData = {
    tableName: "Employees tables",
    product: Employees,
    tableHead: [
      "Employee Id",
      "First Name",
      "Last Name",
      "Email",
      "Phone Number",
      "Employee Type",
      "Branch Id",
    ],
    selectData: {
      stores: StoreNames,
      sortBy: ["First Name", "Last Name"],
    },
    filterBy: ["none", "Branch Name", "A - Z"],
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
              filter
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Employees;
