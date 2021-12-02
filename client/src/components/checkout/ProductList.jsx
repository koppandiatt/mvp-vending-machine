import React from "react";

import SingleProduct from "./SingleProduct";
import { useSelector } from "react-redux";
import { checkoutProducts } from "../../slices/checkout/checkoutSlice";

const ProductList = () => {
  const products = useSelector(checkoutProducts);

  return (
    <>
      <div className="product-container">
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
