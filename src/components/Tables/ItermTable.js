import React from "react";
import { Link } from "react-router-dom";

//reactstrap import
import { Card, CardHeader, Table, Button, Col } from "reactstrap";

const ProductRow = (props) => {
  const { productObj = {}, hasImage = false } = props;
  const propertyValues = Object.keys(productObj);
  return (
    <>
      {propertyValues.map((product, key) => {
        if (hasImage && key == 0) {
          return (
            <td key={key}>
              <img
                src={productObj[product]}
                alt="product-image"
                width="50px"
                style={{ borderRadius: 50 }}
              />
            </td>
          );
        }
        if (product) return <td key={key}>{productObj[product]}</td>;
      })}
    </>
  );
};

function ItermTable(props) {
  const { hasImage, tableData, buttonName = "", path = "", hasButton } = props;
  return (
    <div className="col">
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="mb-0">{tableData.tableName}</h3>
          {hasButton && (
            <Col className="text-right" xs="14" style={{ marginTop: "-30px" }}>
              <Link to={path}>
                <Button color="primary" size="sm">
                  {buttonName}
                </Button>
              </Link>
            </Col>
          )}
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {tableData.tableHead.map((heading, key) => (
                <th key="key" scope="col">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          {tableData.product ? (
            <tbody>
              {tableData.product.map((productObj, key) => (
                <tr key={key}>
                  <ProductRow productObj={productObj} hasImage={hasImage} />
                </tr>
              ))}
            </tbody>
          ) : (
            <div>Loading item</div>
          )}
        </Table>
      </Card>
    </div>
  );
}

export default ItermTable;
