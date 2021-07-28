import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

function Stores() {
  const tableData = {
    tableName: "Stores Tables",
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
              hasButton
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Stores;
