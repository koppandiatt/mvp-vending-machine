import React from "react";

import Paginate from "./Paginate";
import SingleProduct from "./SingleProduct";
import TopBar from "./TopBar";

const PRODUCT = {
  productName: "product 1",
  cost: 15,
  amountAvailable: 10,
  seller: {
    name: "seller",
  },
};

const ProductList = () => {
  return (
    <>
      <TopBar />

      <SingleProduct product={PRODUCT} />

      <Paginate className="justify-content-center" />
    </>
  );
};

export default ProductList;
