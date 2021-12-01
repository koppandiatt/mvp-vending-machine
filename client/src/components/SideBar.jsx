import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { hideCheckout, settingsState } from "../slices/settings/settingSlice";
import ProductList from "./checkout/ProductList";
import { checkoutProductsCount } from "../slices/checkout/checkoutSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const settings = useSelector(settingsState);
  const productCount = useSelector(checkoutProductsCount);

  if (productCount === 0) dispatch(hideCheckout());

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
