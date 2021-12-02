import React, { useEffect } from "react";

import Paginate from "./Paginate";
import SingleProduct from "./SingleProduct";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchSellerProducts,
  productState,
} from "../../slices/product/productSlice";
import { PAGE_SIZE } from "../../constants/pageSize";
import { Spinner } from "react-bootstrap";
import { authState } from "../../slices/auth/authSlice";
import { ROLES } from "../../constants/roles";
import authHelper from "./../../helpers/auth.helper";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, currentPage, searchQuery, loading } =
    useSelector(productState);
  const auth = useSelector(authState);

  useEffect(() => {
    if (auth.isAuthenticated && authHelper.hasRole(ROLES.SELLER)) {
      dispatch(
        fetchSellerProducts({
          page: currentPage,
          limit: PAGE_SIZE,
          search: searchQuery,
        })
      );
    } else {
      dispatch(
        fetchProducts({
          page: currentPage,
          limit: PAGE_SIZE,
          search: searchQuery,
        })
      );
    }
  }, [auth.isAuthenticated]);

  return (
    <>
      <TopBar />
      <div className="product-container">
        {loading ? (
          <Spinner animation="grow" variant="success" />
        ) : products.length ? (
          products.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))
        ) : (
          <h4>There are no products in the database</h4>
        )}
      </div>
      {!loading && <Paginate className="justify-content-center" />}
    </>
  );
};

export default ProductList;
