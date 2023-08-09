import React from "react";
import { Row, Col } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
//components
import { RegisterForm } from "../components/forms";

function Signup(props) {
  return (
    <MainLayout>
      <div className="login-main-container">
        <div className="login-main-wrapper">
          <Row className="w-100">
            <Col md="6" xs="12" className="p-0">
              <RegisterForm />
            </Col>
            <Col md="6" className="d-none d-md-block"></Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Signup;
