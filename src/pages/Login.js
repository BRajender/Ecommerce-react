import React from "react";
import { Row, Col } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
//components
import { LoginForm } from "../components/forms";
//router
import {useNavigate} from "react-router-dom"

function Login(props) {
 const navigate=useNavigate()
 const navigateToSingup=()=>{
     navigate("/signup")
 }
  return (
    <MainLayout>
      <div className="login-main-container">
        <div className="login-main-wrapper">
          <Row className="login-main-row w-100">
            <Col md="6" xs="12" className="p-0">
              <LoginForm redirect={navigateToSingup} />
            </Col>
            <Col md="6" className="d-none d-md-block"></Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
