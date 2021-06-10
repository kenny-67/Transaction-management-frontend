import React, { useEffect, useState } from "react";
import AdminHeader from "../../../components/Headers/AdminHeader";
import ItermTable from "../../../components/Tables/ItermTable";

//network
import { getAllProduct } from "../../../network/AxiosApi";

//reactstrap import
import { Container, Row } from "reactstrap";

function Products() {
  const [Products, setProduct] = useState([]);

  useEffect(() => {
    const getProductFunction = async () => {
      const response = await getAllProduct();
      const { data } = response;
      setProduct(data.products);
    };
    getProductFunction();
  }, []);

  const tableData = {
    tableName: "Product tables",
    product: Products,
    tableHead: [
      "Product Id",
      "Product Name",
      "Quantity",
      "Original Price",
      "Selling price",
      "Date Of Purchase",
    ],
  };

  return (
    <>
      <AdminHeader />
      <Container className="mt--7" fluid>
        <Row>
          <ItermTable
            tableData={tableData}
            buttonName="Add Product"
            path="/admin/add-product"
          />
        </Row>
      </Container>
    </>
  );
}

export default Products;
