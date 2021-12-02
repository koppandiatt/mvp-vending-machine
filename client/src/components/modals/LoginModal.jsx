import React, { useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { hideLogin, settingsState } from "../../slices/settings/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

const LoginModal = () => {
  const dispatch = useDispatch();
  const { showLogin } = useSelector(settingsState);

  const [key, setKey] = useState("login");

  return (
    <Modal
      show={showLogin}
      onHide={() => dispatch(hideLogin())}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Authenticate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 auth-tabs"
        >
          <Tab eventKey="login" title="Login">
            <LoginForm />
          </Tab>
          <Tab eventKey="register" title="Register">
            <RegisterForm />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
