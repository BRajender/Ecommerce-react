import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
//validations
import {
  mobileValidator,
  passwordValidator,
  emailValidator,
  primaryValidator,
} from "../../lib/validations";
//service
import { signup } from "../../services/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";

function RegisterForm(props) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "name") {
      setErrors({
        ...errors,
        [name]: primaryValidator(value),
      });
    }
    if (name === "password") {
      setErrors({
        ...errors,
        [name]: passwordValidator(value),
      });
    }
    if (name === "email") {
      setErrors({
        ...errors,
        [name]: emailValidator(value),
      });
    }
    if (name === "mobile") {
      setErrors({
        ...errors,
        [name]: mobileValidator(value),
      });
    }
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.keys(user).length !== 0 &&
      errors.name === "" &&
      errors.password === "" &&
      errors.email === "" &&
      errors.mobile === ""
    ) {
      const postData = JSON.stringify(user);

      const response = await signup(postData);

      const data = await response.json();

      if (response.status === 201) {
        Notify.success("Registered succesfully");
        navigate("/");
      } else if (response.status === 409) {
        Notify.failure(data.message);
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <p className="login-header mb-0">User Register</p>
      <Form.Group className="login-username-group">
        <Form.Label className="login-input-label">Name</Form.Label>
        <Form.Control
          placeholder="Enter your name"
          className="login-input-control"
          name="name"
          value={user.name}
          onChange={(e) => handleChange(e)}
          isInvalid={errors.name}
          autoComplete="off"
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="login-password-group">
        <Form.Label className="login-input-label">Password</Form.Label>
        <Form.Control
          placeholder="Enter password"
          name="password"
          type="password"
          className="login-input-control"
          value={user.password}
          onChange={(e) => handleChange(e)}
          isInvalid={errors.password}
          autoComplete="off"
        />
        {errors.password && (
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="login-password-group">
        <Form.Label className="login-input-label">Email</Form.Label>
        <Form.Control
          placeholder="Enter email"
          name="email"
          className="login-input-control"
          value={user.email}
          onChange={(e) => handleChange(e)}
          isInvalid={errors.email}
          autoComplete="off"
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group className="login-password-group">
        <Form.Label className="login-input-label">Mobile</Form.Label>
        <Form.Control
          placeholder="Enter mobile"
          name="mobile"
          className="login-input-control"
          value={user.mobile}
          onChange={(e) => handleChange(e)}
          isInvalid={errors.mobile}
          autoComplete="off"
        />
        {errors.mobile && (
          <Form.Control.Feedback type="invalid">
            {errors.mobile}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="text-center mt-5">
        <Button type="submit" className="login-btn">
          Sign up
        </Button>
      </Form.Group>
    </Form>
  );
}

export default RegisterForm;
