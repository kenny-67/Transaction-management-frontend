import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

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
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Row>
          <ItermTable
            tableData={tableData}
            buttonName="Create Store"
            path="/admin/add-store"
          />
        </Row>
      </Container>
    </>
  );
}

export default Stores;
