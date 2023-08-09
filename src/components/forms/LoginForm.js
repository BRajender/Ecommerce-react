import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
//router
import { useNavigate } from "react-router-dom";
//validations
import { emailValidator, primaryValidator } from "../../lib/validations";
//service
import { login } from "../../services/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";

function LoginForm(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const navigateToSignup = () => {
    props.redirect();
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setErrors({
        ...errors,
        [name]: emailValidator(value),
      });
    }
    if (name === "password") {
      setErrors({
        ...errors,
        [name]: primaryValidator(value),
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
      errors.email === "" &&
      errors.password === ""
    ) {
      const postData = JSON.stringify(user);
      const response = await login(postData);

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/");
      } else if (response.status === 404) {
        Notify.failure(data.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <p className="login-header mb-0">User Login</p>
      <Form.Group className="login-username-group">
        <Form.Label className="login-input-label">Email</Form.Label>
        <Form.Control
          placeholder="Enter your Email"
          className="login-input-control"
          name="email"
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
        <Form.Label className="login-input-label">Password</Form.Label>
        <Form.Control
          placeholder="Enter Password"
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
      <Form.Group>
        <p className="resend-otp-text">
          <span className="didnt-recieve">Not Registered ?</span>
          <span className="re-send" onClick={navigateToSignup}>
            Register here
          </span>
        </p>
      </Form.Group>
      <Form.Group className="text-center mt-5">
        <Button type="submit" className="login-btn">
          login
        </Button>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;
