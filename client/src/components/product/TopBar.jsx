import React from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";

const TopBar = () => {
  return (
    <Row className="justify-content-evenly align-items-center mb-4 mt-3 gy-3 ">
      <Col md="4" xs="6">
        <span>Welcome, username!</span>
      </Col>
      <Col md="4" xs="12" className="order-xs-last">
        <FormControl type="text" placeholder="Search in products..." />
      </Col>
      <Col md="4" xs="6" className="text-end">
        <Button>Add new product</Button>
      </Col>
    </Row>
  );
};

export default TopBar;
