import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//network
import { getAllStore } from "../../../network/AxiosApi";

function Stores() {
  const [Stores, setStores] = useState([]);

  useEffect(() => {
    const getProductFunction = async () => {
      const response = await getAllStore();
      const { data } = response;
      setStores(data.stores);
    };
    getProductFunction();
  }, []);
  const tableData = {
    tableName: "Stores tables",
    product: Stores,
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
              buttonName="Create Store"
              path="/admin/add-store"
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Stores;
