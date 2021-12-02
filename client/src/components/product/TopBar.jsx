import React from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "../../constants/pageSize";
import { ROLES } from "../../constants/roles";
import { authState } from "../../slices/auth/authSlice";
import {
  fetchProducts,
  productState,
  setCurrentPage,
  setSearchQuery,
} from "../../slices/product/productSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const product = useSelector(productState);
  const auth = useSelector(authState);

  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
    dispatch(
      fetchProducts({
        page: 1,
        limit: PAGE_SIZE,
        search: value,
      })
    );
  };

  return (
    <Row className="justify-content-evenly align-items-center mb-4 mt-3 gy-3 ">
      <Col md="4" xs="6">
        {auth.isAuthenticated && (
          <span>Welcome, {auth.currentUser.username}!</span>
        )}
      </Col>
      <Col md="4" xs="12" className="order-xs-last">
        <FormControl
          value={product.searchQuery}
          type="text"
          placeholder="Search in products..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Col>
      <Col md="4" xs="6" className="text-end">
        {auth.isAuthenticated && auth.currentUser.role.name === ROLES.BUYER && (
          <Button>Make deposit</Button>
        )}
        {auth.isAuthenticated &&
          auth.currentUser.role.name === ROLES.SELLER && (
            <Button>Add new product</Button>
          )}
      </Col>
    </Row>
  );
};

export default TopBar;
