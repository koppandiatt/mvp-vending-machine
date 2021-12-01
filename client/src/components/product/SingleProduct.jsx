import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  checkoutProducts,
} from "../../slices/checkout/checkoutSlice";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const checkoutList = useSelector(checkoutProducts);
  const isProductInCart = checkoutList.some((item) => item._id === product._id);
  const chooseBtnText = isProductInCart ? "Already in cart" : "Choose";

  return (
    <Card style={{ width: "300px" }} className="shadow-sm mb-4 rounded">
      <Card.Header>
        <b>{product.productName}</b>
      </Card.Header>
      <Card.Body>
        <p>Sold by: {product.seller.username}</p>
        <Card.Title className="mt-3">Price: {product.cost}$ </Card.Title>
      </Card.Body>
      <Card.Footer>
        {product.amountAvailable ? (
          <Button
            variant="success"
            onClick={() => dispatch(addToCart(product))}
            disabled={isProductInCart}
          >
            {chooseBtnText}
          </Button>
        ) : (
          <Button variant="danger" disabled>
            Out of stock!
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default SingleProduct;
