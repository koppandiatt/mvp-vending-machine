import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fas from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">Vending machine</Navbar.Brand>
          <Nav>
            <Button variant="info" className="me-2 position-relative">
              <span className="cart-badge">3</span>
              <FontAwesomeIcon icon={fas.faShoppingBag} />
            </Button>
            <Button>Login</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
