import React from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "../../constants/pageSize";
import { ROLES } from "../../constants/roles";
import authHelper from "../../helpers/auth.helper";
import { authState } from "../../slices/auth/authSlice";
import {
  fetchProducts,
  fetchSellerProducts,
  productState,
  setCurrentPage,
  setSearchQuery,
} from "../../slices/product/productSlice";
import {
  showDepositModal,
  showProductModal,
} from "../../slices/settings/settingSlice";

const TopBar = () => {
  const dispatch = useDispatch();
  const product = useSelector(productState);
  const auth = useSelector(authState);

  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
    if (auth.isAuthenticated && authHelper.hasRole(ROLES.SELLER)) {
      dispatch(
        fetchSellerProducts({
          page: 1,
          limit: PAGE_SIZE,
          search: value,
        })
      );
    } else {
      dispatch(
        fetchProducts({
          page: 1,
          limit: PAGE_SIZE,
          search: value,
        })
      );
    }
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
          <Button onClick={() => dispatch(showDepositModal())}>
            Make deposit
          </Button>
        )}
        {auth.isAuthenticated &&
          auth.currentUser.role.name === ROLES.SELLER && (
            <Button onClick={() => dispatch(showProductModal())}>
              Add new product
            </Button>
          )}
      </Col>
    </Row>
  );
};

export default TopBar;
