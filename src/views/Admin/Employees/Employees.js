import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import ItermTable from "../../../components/Tables/ItermTable";

//reactstrap import
import { Container, Row } from "reactstrap";

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
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Row>
          <ItermTable
            tableData={tableData}
            buttonName="Add Employee"
            path="/admin/add-employee"
          />
        </Row>
      </Container>
    </>
  );
}

export default Employees;
