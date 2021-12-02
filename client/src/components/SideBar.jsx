import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Offcanvas } from "react-bootstrap";
import { hideCheckout, settingsState } from "../slices/settings/settingSlice";
import ProductList from "./checkout/ProductList";
import { checkoutProductsCost } from "../slices/checkout/checkoutSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const settings = useSelector(settingsState);

  const productsTotalCost = useSelector(checkoutProductsCost);

  return (
    <Offcanvas
      show={settings.showCheckout}
      placement="end"
      scroll={true}
      onHide={() => dispatch(hideCheckout())}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Checkout</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ProductList />
        <div className="text-center">
          <h4>Final Cost: {productsTotalCost}$</h4>
          <Button variant="success">Checkout</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
