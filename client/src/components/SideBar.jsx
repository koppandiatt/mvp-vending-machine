import React from "react";
import { Offcanvas } from "react-bootstrap";

const SideBar = () => {
  return (
    <Offcanvas placement="end" scroll={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Checkout</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body></Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
