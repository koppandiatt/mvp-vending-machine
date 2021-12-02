import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { hideCheckout, settingsState } from "../slices/settings/settingSlice";
import { checkoutState } from "../slices/checkout/checkoutSlice";
import Cart from "./checkout/Cart";
import OrderResult from "./checkout/OrderResult";

const SideBar = () => {
  const dispatch = useDispatch();
  const settings = useSelector(settingsState);
  const { checkout } = useSelector(checkoutState);

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
        {checkout ? (
          <OrderResult />
        ) : (
          <>
            <Cart />
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
