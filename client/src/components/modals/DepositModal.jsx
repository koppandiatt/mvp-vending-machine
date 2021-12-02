import React from "react";
import { Button, Modal } from "react-bootstrap";
import {
  hideDepositModal,
  settingsState,
} from "../../slices/settings/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { COINS } from "./../../constants/coins";

const LoginModal = () => {
  const dispatch = useDispatch();
  const { showDeposit } = useSelector(settingsState);

  return (
    <Modal
      show={showDeposit}
      onHide={() => dispatch(hideDepositModal())}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deposit Coins</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {COINS.map((coin) => (
          <Button variant="warning">{coin}$</Button>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
