import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { Row, Col, Button, Form } from "react-bootstrap";
//components
import { CartTable } from "../components/tables";
import { EmptyCart } from "../components/cards";
import { Search } from "../components/elements";
//context
import { useUserState, useUserDispatch } from "../context";
// Actions types
import * as ActionTypes from "../constans/ActionTypes";
import { Report } from "notiflix/build/notiflix-report-aio";
import { CheckoutForm } from "../components/forms";
//service
import {
  getProductsInCart,
  checkoutOrders,
  search,
} from "../services/products";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

function Cart(props) {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const [carts, setCarts] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [address, setAddress] = useState("");
  // const [input,setInput]=useState("")
  const navigate = useNavigate();
  const productRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user !== null) {
      fetchData(user.userId);
    }
  }, [state.cart_count]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navigateToProducts=()=>{
    navigate("/")
  }

  const handleSearch = (input) => {
    // const postData = {
    //   searchTerm: input,
    // };
    // const response = await search(JSON.stringify(postData));
    // const data = response.json();
    // if (response.status === 200) {
    //   setCarts(data.data);
    //   setInput("")
    // } else if (response.status === 404) {
    //   Notify.info("No records found");
    //   setInput("");
    // } else if (response.status === 401) {
    //   logout();
    // }

    if (input !== "") {
      const copy_carts = [...productRef.current];
      const filteredCarts = copy_carts.filter((cart) => {
        return cart.productName.toLowerCase().includes(input.toLowerCase());
      });
      if (filteredCarts.length > 0) {
        setCarts(filteredCarts);
      } else {
        Notify.info("No Records Found");
      }
    } else {
      setCarts(productRef.current);
    }
  };

  const handleCheckout = () => {
    setCheckout(!checkout);
  };

  const fetchData = async (id) => {
    const postData = {
      userId: id,
    };
    const response = await getProductsInCart(JSON.stringify(postData));
    const data = await response.json();

    if (response.status === 200) {
      productRef.current = data.data;
      setCarts(data.data);
    } else if (response.status === 401) {
      logout();
    } else if (response.status === 404) {
      setCarts([]);
      dispatch({
        type: ActionTypes.CART_COUNT,
        payload: 0,
      });
    } else {
      Notify.failure(response.statusText);
    }
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const confirmOrder = async () => {
    let cart = [];
    carts.forEach((item) => {
      cart.push({
        product: {
          productId: item.productId,
          totalPrice: item.totalPrice,
          quantity: item.quantity,
        },
        userId: user.userId,
        address: address,
      });
    });
    const postData = cart
     
    const response = await checkoutOrders(JSON.stringify(postData));
    const data = await response.json();
    if (response.status === 200) {
      Notify.success("order confirmed");
      fetchData(user.userId);
      navigate("/orders");
    } else if (response.status === 401) {
      logout();
    }
    else{
      Notify.failure(response.statusText)
    }

  };

  return (
    <MainLayout>
      {carts.length > 0 ? (
        <>
          {checkout ? (
            <div className="landing-container">
              <Form className="mt-3">
                <Row>
                  <Col></Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        onChange={(e) => handleAddress(e)}
                      />
                    </Form.Group>
                    <Form.Group className="mt-5">
                      <Button onClick={() => confirmOrder()}>
                        Confirm Adress
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                </Row>
              </Form>
            </div>
          ) : (
            <>
              <Row className="w-100 mt-5">
                <Col md="6">
                  <p className="page-header">Cart</p>
                </Col>
                <Col md="6">
                  <div className="local_search_wrapper ms-auto">
                    <img src="/images/search.png" />
                    <Search
                      handlesearch={handleSearch}
                      // onsubmit={handleSearch}
                    />
                  </div>
                </Col>
              </Row>

              <div className="tableContainer tableFixHead">
                <CartTable data={carts} />
              </div>
              <div className="d-flex w-100">
                <Button
                  className="add_product_btn"
                  onClick={() => handleCheckout()}
                >
                  Proceed to Checkout
                </Button>
                <Button className=" ms-auto" onClick={() => navigateToProducts()}>
                  Back to products
                </Button>
              </div>
            </>
          )}
        </>
      ) : (
        <EmptyCart />
      )}
    </MainLayout>
  );
}

export default Cart;
