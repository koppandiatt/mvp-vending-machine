import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { hideCheckout, settingsState } from "../slices/settings/settingSlice";
import ProductList from "./checkout/ProductList";

const SideBar = () => {
  const dispatch = useDispatch();
  const settings = useSelector(settingsState);

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
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
