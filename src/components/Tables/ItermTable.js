import React from "react";
import { useHistory, Link } from "react-router-dom";

//reactstrap import
import { Card, CardHeader, Table, Button, Col } from "reactstrap";

const ProductRow = (props) => {
  const { productObj } = props;
  return (
    <>
      {Object.values(productObj).map((product, key) => (
        <td key={key}>{product}</td>
      ))}
    </>
  );
};

function ItermTable(props) {
  const { tableData, buttonName, path } = props;
  const history = useHistory();
  return (
    <div className="col">
      <Card className="shadow">
        <CardHeader className="border-0">
          <h3 className="mb-0">{tableData.tableName}</h3>
          <Col className="text-right" xs="14" style={{ marginTop: "-30px" }}>
            <Link to={path}>
              <Button color="primary" size="sm">
                {buttonName}
              </Button>
            </Link>
          </Col>
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
                  <ProductRow productObj={productObj} />
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
