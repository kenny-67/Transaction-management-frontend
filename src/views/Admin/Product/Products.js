import React, { useEffect, useState } from "react";
import ItermTable from "../../../components/Tables/ItermTable";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../../config/animation";

//reactstrap import
import { Container, Row } from "reactstrap";

function Products() {
  const tableData = {
    tableName: "Product Table",
    tableHead: [
      "Product Id",
      "Product Name",
      "Quantity",
      "Original Price",
      "Selling price",
      "Date Of Purchase",
      "Store Id",
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
              buttonName="Add Product"
              path="/admin/add-product"
              hasButton
              // filter
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Products;
