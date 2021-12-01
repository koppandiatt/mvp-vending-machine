import React from "react";
import { Card, Button } from "react-bootstrap";

const SingleProduct = ({ product }) => {
  return (
    <div className="product-container">
      <Card style={{ width: "300px" }} className="shadow-sm mb-4 rounded">
        <Card.Header>{product.productName}</Card.Header>
        <Card.Body>
          <Card.Title>Price: {product.cost}$ </Card.Title>
          <Card.Subtitle>Sold by: {product.seller.username}</Card.Subtitle>
        </Card.Body>
        <Card.Footer>
          {product.amountAvailable ? (
            <Button variant="success">Choose</Button>
          ) : (
            <Button variant="danger" disabled>
              Out of stock!
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingleProduct;
