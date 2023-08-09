import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { Row, Col } from "react-bootstrap";
//components
import { ProductTable } from "../components/tables";
import { Search } from "../components/elements";
//context
import { useUserState, useUserDispatch } from "../context";
// Actions types
import * as ActionTypes from "../constans/ActionTypes";
//srvice
import { getProducts, getProductsInCart, search } from "../services/products";
import { Report } from "notiflix/build/notiflix-report-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const productRef = useRef(null);
  useEffect(() => {
    fetchProducts();
    if (user !== null) {
      fetchCartCount(user.userId);
    }
  }, []);

  const navigateToProducts = () => {
    dispatch({
      type: ActionTypes.EXPLORE_PRODUCT,
      payload: false,
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchProducts = async () => {
    const response = await getProducts();
    const data = await response.json();
    if (response.status === 200) {
      productRef.current = data.data;
      setProducts(data.data);
    } else if (response.status === 401) {
      logout();
    } else if (response.status === 404) {
      setProducts([]);
    } else {
      Notify.failure(response.statusText);
    }
  };

  const handleSearch = async (input) => {
    if (input !== "") {
      // const postData = {
      //   searchTerm: input,
      // };
      // const response = await search(JSON.stringify(postData));
      // const data = response.json();
      // if (response.status === 200) {
      //   setProducts(data.data);
      // } else if (response.status === 404) {
      //   Notify.info("No records found");
      // } else if (response.status === 401) {
      //   logout();
      // }
      const copy_products = [...productRef.current];
      const filteredProducts = copy_products.filter((product) => {
        return product.productName.toLowerCase().includes(input.toLowerCase());
      });
      if (filteredProducts.length > 0) {
        setProducts(filteredProducts);
      } else {
        Notify.info("No records found");
      }
    } else {
      setProducts(productRef.current);
    }
  };

  const fetchCartCount = async (userid) => {
    const postData = {
      userId: userid,
    };
    const response = await getProductsInCart(JSON.stringify(postData));
    const data = await response.json();
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.CART_COUNT,
        payload: data.totalProductsInCart,
      });
    } else if (response.status === 404) {
      dispatch({
        type: ActionTypes.CART_COUNT,
        payload: 0,
      });
    } else if (response.status === 401) {
      logout();
    }
  };
  return (
    <MainLayout>
      {state.explore_product ? (
        <div className="landing-container">
          <img
            src="/images/bb.png"
            width="50"
            height="50"
            className="mx-auto"
          ></img>
          <h3 className="mt-3">BB</h3>
          <p>
            BB is your go-to place for gifts & goodies that surprise & delight.
            From fresh fragrances to soothing skin care, we make finding your
            perfect something special a happy-memory-making experience.
            Searching for new seasonal creations or your favorite discontinued
            scents? We’ve got you covered there, too. Oh! And while you're
            browsing, shop our latest & greatest selection of lotions, soaps and
            lip balms!
          </p>
          <form>
            <button
              className="btn btn-secondary"
              onClick={() => navigateToProducts()}
            >
              Explore Products
            </button>
          </form>
        </div>
      ) : products && products.length > 0 ? (
        <>
          <Row className="w-100 mt-5">
            <Col md="6"></Col>
            <Col md="6">
              <div className="local_search_wrapper ms-auto">
                <img src="/images/search.png" />
                <Search handlesearch={handleSearch} />
              </div>
            </Col>
          </Row>
          <div className="tableContainer tableFixHead">
            <ProductTable data={products} />
          </div>
        </>
      ) : (
        <div className="landing-container">
          <h1 className="mt-5">There is nothing . No records Found </h1>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
