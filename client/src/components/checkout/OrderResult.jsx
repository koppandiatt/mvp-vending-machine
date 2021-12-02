import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { checkoutState } from "../../slices/checkout/checkoutSlice";

const OrderResult = () => {
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
      {checkout.change.length > 0 && (
        <>
          <h5>Your change:</h5>
          <ListGroup className="my-4">
            {checkout.change.map(({ coin, amount }) => (
              <ListGroup.Item>
                {coin}$ x {amount}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default OrderResult;
