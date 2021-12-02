import React from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import {
  hideDepositModal,
  settingsState,
} from "../../slices/settings/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { COINS } from "./../../constants/coins";
import { authState, makeDeposit } from "../../slices/auth/authSlice";

const DepositModal = () => {
  const dispatch = useDispatch();
  const { showDeposit } = useSelector(settingsState);
  const { currentUser } = useSelector(authState);

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
        <Stack gap={3} className="col-md-8 my-3 mx-auto">
          <h3>Current deposit: {currentUser?.deposit}$</h3>
          <hr />
          {COINS.map((coin) => (
            <Button
              key={coin}
              variant="warning"
              onClick={() => dispatch(makeDeposit(coin))}
            >
              {coin}$
            </Button>
          ))}
          <hr />
          <Button
            variant="danger"
            onClick={() => dispatch(hideDepositModal())}
            disabled={!currentUser.deposit}
          >
            Reset deposit to 0
          </Button>
          <hr />
          <Button
            variant="outline-secondary"
            onClick={() => dispatch(hideDepositModal())}
          >
            Close
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default DepositModal;
