import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";
import { Alert, Button, Form, FormControl, Stack } from "react-bootstrap";

import { hideLogin } from "../../slices/settings/settingSlice";
import { authState, doLogin, doRegister } from "../../slices/auth/authSlice";
import { ROLES } from "./../../constants/roles";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [errors, setErrors] = useState("");

  const doSubmit = () => {
    const user = {
      username,
      password,
      password_confirmation: confirmPassword,
      role,
    };
    if (validateForm(user)) {
      dispatch(doRegister(user));
    }
  };

  const passwordComplexity = {
    min: 6,
    max: 255,
    upperCase: 1,
    numeric: 1,
    requirementCount: 2,
  };

  const schema = Joi.object({
    role: Joi.string().required(),
    username: Joi.string().min(6).max(50).required(),
    password: new PasswordComplexity(passwordComplexity).required(),
    password_confirmation: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match!" } }),
  });

  const validateForm = (user) => {
    const { error } = schema.validate(user);
    if (error) {
      setErrors(error.message);
      console.log(error);
      return false;
    }
    setErrors("");
    return true;
  };

  return (
    <Stack gap={4} className="col-md-8 my-5 mx-auto">
      {auth.error && <Alert variant="danger">{auth.error}</Alert>}

      <Form.Select
        aria-label="Register as role"
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Register as</option>
        <option value={ROLES.BUYER}>Buyer</option>
        <option value={ROLES.SELLER}>Seller</option>
      </Form.Select>

      <FormControl
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        required
      />
      <FormControl
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />

      <FormControl
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm password"
        required
      />

      {errors && <Alert variant="danger">{errors}</Alert>}

      <Button variant="primary" onClick={doSubmit}>
        Register
      </Button>
      <Button variant="outline-secondary" onClick={() => dispatch(hideLogin())}>
        Cancel
      </Button>
    </Stack>
  );
};

export default RegisterForm;
