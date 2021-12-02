import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";
import {
  hideLogin,
  showCheckout,
  showLogin,
} from "../slices/settings/settingSlice";
import { checkoutProductsCount } from "../slices/checkout/checkoutSlice";
import { authState, logout } from "../slices/auth/authSlice";
import authHelper from "../helpers/auth.helper";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const productsCount = useSelector(checkoutProductsCount);
  const auth = useSelector(authState);

  useEffect(() => {
    if (auth.isAuthenticated) dispatch(hideLogin());
  }, [auth]);

  const logoutUser = () => {
    dispatch(logout());
    authHelper.removeJWT();
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">Vending machine</Navbar.Brand>
          <Nav>
            {productsCount > 0 && (
              <Button
                variant="info"
                className="me-2 position-relative"
                onClick={() => dispatch(showCheckout())}
              >
                <span className="cart-badge">{productsCount}</span>
                <FontAwesomeIcon icon={fas.faShoppingBag} />
              </Button>
            )}
            {auth.isAuthenticated ? (
              <Button onClick={() => logoutUser()} variant="danger">
                Logout
              </Button>
            ) : (
              <Button onClick={() => dispatch(showLogin())}>Login</Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
