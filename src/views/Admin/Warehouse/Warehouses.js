import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

//network
import { getAllWarehouse } from "../../../network/AxiosApi";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

function Warehouses() {
  const [Warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    const getProductFunction = async () => {
      const response = await getAllWarehouse();
      const { data } = response;
      setWarehouse(data.warehouses);
    };
    getProductFunction();
  }, []);
  const tableData = {
    tableName: "Warehouse table",
    product: Warehouse,
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
              buttonName="Create Warehouse"
              path="/admin/create-warehouse"
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Warehouses;
