import React from "react";
import { Card, Button, InputGroup, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../slices/checkout/checkoutSlice";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  const totalCost = product.cost * product.qty;

  return (
    <Card style={{ width: "300px" }} className="shadow-sm mb-4 rounded">
      <Card.Header>{product.productName}</Card.Header>
      <Card.Body>
        <Card.Title>Cost: {product.cost}$ </Card.Title>
        <Card.Subtitle>Sold by: {product.seller.username}</Card.Subtitle>
        <Row className="mt-4">
          <Col>
            <h5>Total Price: {totalCost}$</h5>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col xs="9">
            <InputGroup>
              <Button
                variant="info"
                onClick={() => dispatch(decreaseQty(product._id))}
                disabled={product.qty === 1}
              >
                <FontAwesomeIcon icon={fas.faMinus} />
              </Button>
              <span style={{ padding: "8px 20px", fontWeight: "bold" }}>
                {product.qty}
              </span>
              <Button
                variant="info"
                onClick={() => dispatch(increaseQty(product._id))}
                disabled={product.qty === product.amountAvailable}
              >
                <FontAwesomeIcon icon={fas.faPlus} />
              </Button>
            </InputGroup>
          </Col>
          <Col xs="3" className="text-align-end">
            <Button
              variant="danger"
              onClick={() => dispatch(removeFromCart(product._id))}
            >
              <FontAwesomeIcon icon={fas.faTrashAlt} />
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default SingleProduct;
