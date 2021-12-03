import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { hideCheckout, settingsState } from "../slices/settings/settingSlice";
import { checkoutState } from "../slices/checkout/checkoutSlice";
import Cart from "./checkout/Cart";
import OrderResult from "./checkout/OrderResult";
import { resetDeposit } from "../slices/auth/authSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const settings = useSelector(settingsState);
  const { checkout } = useSelector(checkoutState);

  useEffect(() => {
    if (checkout) dispatch(resetDeposit());
  }, [checkout]);

  const closeCheckout = () => {
    dispatch(hideCheckout());
  };

  return (
    <Offcanvas
      show={settings.showCheckout}
      placement="end"
      scroll={true}
      onHide={closeCheckout}
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
