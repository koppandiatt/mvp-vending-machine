import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, FormControl, Stack } from "react-bootstrap";

import { hideLogin } from "../../slices/settings/settingSlice";
import { authState, doLogin } from "../../slices/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doSubmit = () => {
    dispatch(doLogin({ username, password }));
  };

  return (
    <Stack gap={4} className="col-md-8 my-5 mx-auto">
      {auth.error && <Alert variant="danger">{auth.error}</Alert>}

      <FormControl
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
      />
      <FormControl
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />

      <Button
        variant="primary"
        onClick={doSubmit}
        disabled={username.length < 6 || password.length < 6}
      >
        Login
      </Button>
      <Button variant="outline-secondary" onClick={() => dispatch(hideLogin())}>
        Cancel
      </Button>
    </Stack>
  );
};

export default LoginForm;
