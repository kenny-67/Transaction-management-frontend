import React, { useState, useEffect } from "react";
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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

//styled component
import styled from "styled-components";

//network
import {
  getOrders,
  getAllProduct,
  getAllDebtor,
  getAllEmployees,
  getAllWarehouse,
  getAllStore,
} from "../../network/AxiosApi";

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
    rowOnClickFunction,
  } = props;
  const { selectData, tableName } = tableData;
  const [apiData, setApiData] = useState({});

  let apiEndpoint;

  //pagination Data
  let nextPage = null;
  let previousPage = null;
  let totalPages = null;
  let currentPage = 1;

  const getApiData = async (page) => {
    tableName === "Order Table"
      ? (apiEndpoint = getOrders)
      : tableName === "Product Table"
      ? (apiEndpoint = getAllProduct)
      : tableName === "Debtors Table"
      ? (apiEndpoint = getAllDebtor)
      : tableName === "Employees Table"
      ? (apiEndpoint = getAllEmployees)
      : tableName === "Stores Tables"
      ? (apiEndpoint = getAllStore)
      : (apiEndpoint = getAllWarehouse);
    const { data } = await apiEndpoint(page);
    setApiData(data);
  };

  useEffect(() => {
    getApiData(1);
  }, []);

  if (apiData.success) {
    nextPage = apiData.paginationData.nextPage;
    previousPage = apiData.paginationData.previousPage;
    totalPages = apiData.paginationData.totalPages;
    currentPage = apiData.paginationData.currentPage;
  }

  const handlePages = async (page) => {
    getApiData(page);
  };

  return (
    <ItermTable.Wrapper className="col">
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
          {apiData.data ? (
            <tbody>
              {apiData.data.map((productObj, key) => (
                <>
                  {rowOnClickFunction ? (
                    <tr
                      key={key}
                      onClick={() => rowOnClickFunction(productObj)}
                    >
                      <ProductRow productObj={productObj} hasImage={hasImage} />
                    </tr>
                  ) : (
                    <tr key={key}>
                      <ProductRow productObj={productObj} hasImage={hasImage} />
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          ) : (
            <div>Loading item</div>
          )}
        </Table>
      </Card>
      <div className="pagination">
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first onClick={() => handlePages(1)} />
          </PaginationItem>
          <PaginationItem disabled={nextPage == null}>
            <PaginationLink
              previous
              onClick={() => handlePages(previousPage)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((page, i) => (
            <PaginationItem key={i} active={currentPage == i + 1}>
              <PaginationLink onClick={() => handlePages(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled={nextPage == null}>
            <PaginationLink next onClick={() => handlePages(nextPage)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={() => handlePages(totalPages)} />
          </PaginationItem>
        </Pagination>
      </div>
    </ItermTable.Wrapper>
  );
}

ItermTable.Wrapper = styled.div`
  .pagination {
    margin-top: 10px;
    margin-left: 33%;
  }
`;

export default ItermTable;
