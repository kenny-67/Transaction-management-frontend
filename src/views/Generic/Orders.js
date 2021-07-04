import React, { useEffect, useState } from "react";
import ItermTable from "../../components/Tables/ItermTable";
import { motion } from "framer-motion";
import { genericAdminVariants } from "../../config/animation";

//network
import { getOrders } from "../../network/AxiosApi";

//reactstrap import
import { Container, Row } from "reactstrap";

function Orders() {
  const [Orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const buttonPath = user.isAdmin
    ? "/admin/create-order"
    : "/employee/create-order";

  useEffect(() => {
    const getOrdersCall = async () => {
      const { data } = await getOrders();
      setOrders(data.order);
      console.log(data);
    };

    getOrdersCall();
  }, []);

  const tableData = {
    tableName: "Order tables",
    product: Orders,
    tableHead: [
      "Order Id",
      "User Id",
      "Total",
      "Amount Paid",
      "Status",
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
              buttonName="create order"
              path={buttonPath}
              hasButton
            />
          </Row>
        </motion.div>
      </Container>
    </>
  );
}

export default Orders;
