import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Row, Col, Form } from "react-bootstrap";
//components
import { OrdersTable } from "../components/tables";
import { EmptyCart } from "../components/cards";
import { Search } from "../components/elements";
//context
import { useUserState } from "../context";
// Actions types
import * as ActionTypes from "../constans/ActionTypes";
import { Report } from "notiflix/build/notiflix-report-aio";
import { fetchOrders } from "../services/products";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

function Orders(props) {
  const state = useUserState();
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchData = async () => {
    const postData = {
      userId: user.userId,
    };
    const response = await fetchOrders(JSON.stringify(postData));
    const data = await response.json();
    if (response.status === 200) {
      setOrders(data.data);
    } else if (response.status === 404) {
      // Notify.info("No records found")
    } else if (response.status === 401) {
      logout();
    } else {
      Notify.failure(response.statusText);
    }
  };

  return (
    <MainLayout>
      {orders.length > 0 ? (
        <>
          <Row className="w-100 mt-5">
            <Col md="9">
              <p className="page-header">Orders</p>
            </Col>
            <Col md="3" className="text-right order_profile_col">
              <p className="profile_text mb-0">Name:{user && user.name}</p>
              <p className="profile_text mb-0">Email:{user && user.email}</p>
              <p className="profile_text mb-0">Mobile:{user && user.mobile}</p>
            </Col>
          </Row>

          <div className="tableContainer tableFixHead">
            <OrdersTable data={orders} />
          </div>
        </>
      ) : (
        <div className="landing-container">
          <h1 className="mt-5">There is nothing . No orders Found </h1>
        </div>
      )}
    </MainLayout>
  );
}

export default Orders;
