import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

//network
import { getAllWarehouse } from "../../../network/AxiosApi";

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
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Row>
          <ItermTable
            tableData={tableData}
            buttonName="Create Warehouse"
            path="/admin/create-warehouse"
          />
        </Row>
      </Container>
    </>
  );
}

export default Warehouses;
