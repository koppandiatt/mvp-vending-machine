import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  buyProducts,
  checkoutProductsCost,
  checkoutState,
} from "../../slices/checkout/checkoutSlice";
import ProductList from "./ProductList";

const Cart = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(checkoutState);
  const productsTotalCost = useSelector(checkoutProductsCost);

  return (
    <>
      <ProductList />
      <div className="text-center">
        <h4>Final Cost: {productsTotalCost}$</h4>
        <Button
          variant="success"
          onClick={() =>
            dispatch(
              buyProducts({
                products,
                totalCost: productsTotalCost,
              })
            )
          }
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default Cart;
