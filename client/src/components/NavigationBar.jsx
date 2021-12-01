import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";
import { showCheckout } from "../slices/settings/settingSlice";
import { checkoutProductsCount } from "../slices/checkout/checkoutSlice";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const productsCount = useSelector(checkoutProductsCount);
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
            <Button>Login</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
