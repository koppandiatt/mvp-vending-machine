import React, { useEffect } from "react";

import Paginate from "./Paginate";
import SingleProduct from "./SingleProduct";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, productState } from "../../slices/product/productSlice";
import { PAGE_SIZE } from "../../constants/pageSize";

const ProductList = () => {
  const dispatch = useDispatch();
  const product = useSelector(productState);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: product.currentPage,
        limit: PAGE_SIZE,
        search: product.searchQuery,
      })
    );
  }, []);

  return (
    <>
      <TopBar />
      <div className="product-container">
        {product.products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
      <Paginate className="justify-content-center" />
    </>
  );
};

export default ProductList;
