import React, { useState } from "react";
import { Link } from "react-router-dom";

//reactstrap import
import {
  Card,
  CardHeader,
  Table,
  Button,
  Col,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import { getAllEmployee } from "../../../../Transaction Management back-end/controllers/employeeController";

const EmployeeSelect = (props) => {
  const { selectData } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleSortClick = () => {};
  const handleFilterClick = (e) => {
    // getAllEmployee()
    console.log(e.target.textContent);
  };
  return (
    <>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        style={{
          position: "absolute",
          left: "70%",
          top: "20%",
          width: "150px",
          color: "000000",
        }}
      >
        <DropdownToggle caret>filter</DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            header
            style={{
              color: "#111111",
            }}
          >
            Filter By
          </DropdownItem>
          <DropdownItem text>Store Name</DropdownItem>
          {selectData.stores &&
            selectData.stores.map((store, key) => (
              <DropdownItem key={key} onClick={handleFilterClick}>
                {store}
              </DropdownItem>
            ))}
          <DropdownItem divider />
          <DropdownItem
            header
            style={{
              color: "#111111",
            }}
          >
            Sort By
          </DropdownItem>
          {/* <DropdownItem>Date</DropdownItem> */}
          <DropdownItem>First Name</DropdownItem>
          <DropdownItem>Last Name</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

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
  const {
    hasImage,
    tableData,
    buttonName = "",
    path = "",
    hasButton,
    filter,
  } = props;
  const { selectData } = tableData;

  return (
    <div className="col">
      <Card className="shadow">
        <CardHeader className="border-0" style={{ position: "relative" }}>
          <h3 className="mb-0">{tableData.tableName}</h3>

          {filter && <EmployeeSelect selectData={selectData} />}
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
