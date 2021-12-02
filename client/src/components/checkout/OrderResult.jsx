import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkoutState } from "../../slices/checkout/checkoutSlice";
import { hideCheckout } from "../../slices/settings/settingSlice";

const OrderResult = () => {
  const dispatch = useDispatch();
  const { checkout } = useSelector(checkoutState);

  return (
    <div>
      <h3>Ordered products:</h3>
      <ListGroup className="my-4">
        {checkout.products.map(({ productName, amountOrdered }) => (
          <ListGroup.Item>
            {amountOrdered} x {productName}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4>Total Cost: {checkout.amountSpent}$</h4>
      <hr />
      <h5>Your change:</h5>
      <ListGroup className="my-4">
        {checkout.change.map(({ coin, amount }) => (
          <ListGroup.Item>
            {coin}$ x {amount}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="success" onClick={() => dispatch(hideCheckout())}>
        Thank you
      </Button>
    </div>
  );
};

export default OrderResult;
