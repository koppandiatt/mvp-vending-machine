import React from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../constants/roles";
import authHelper from "../../helpers/auth.helper";
import { authState } from "../../slices/auth/authSlice";
import {
  addToCart,
  checkoutProducts,
} from "../../slices/checkout/checkoutSlice";
import { showLogin } from "../../slices/settings/settingSlice";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();
  const checkoutList = useSelector(checkoutProducts);
  const isProductInCart = checkoutList.some((item) => item._id === product._id);
  const chooseBtnText = isProductInCart ? "Already in cart" : "Choose";
  const auth = useSelector(authState);

  const handleChooseProduct = (product) => {
    if (!auth.isAuthenticated) {
      dispatch(showLogin());
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <Card style={{ width: "300px" }} className="shadow-sm mb-4 rounded">
      <Card.Header>
        <b>{product.productName}</b>
      </Card.Header>
      <Card.Body>
        <p>Sold by: {product.seller.username}</p>

        {auth.isAuthenticated && authHelper.hasRole(ROLES.SELLER) && (
          <p>Amount available: {product.amountAvailable}</p>
        )}
        <Card.Title className="mt-3">Price: {product.cost}$ </Card.Title>
      </Card.Body>
      <Card.Footer>
        {((auth.isAuthenticated && authHelper.hasRole(ROLES.BUYER)) ||
          !auth.isAuthenticated) &&
          (product.amountAvailable ? (
            <Button
              variant="success"
              onClick={() => handleChooseProduct(product)}
              disabled={isProductInCart}
            >
              {chooseBtnText}
            </Button>
          ) : (
            <Button variant="danger" disabled>
              Out of stock!
            </Button>
          ))}
        {auth.isAuthenticated && authHelper.hasRole(ROLES.SELLER) && (
          <div className="d-flex justify-content-between">
            <Button variant="info" onClick={() => dispatch(addToCart(product))}>
              Edit Product
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch(addToCart(product))}
            >
              Delete Product
            </Button>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};

export default SingleProduct;
