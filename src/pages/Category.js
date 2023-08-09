import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import { Row, Col } from "react-bootstrap";
//context
import { useUserState } from "../context";
//components
import { ProductTable } from "../components/tables";
import { Search } from "../components/elements";
import { Report } from "notiflix/build/notiflix-report-aio";
//service
import { getCategoryProducts, search } from "../services/products";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

function Category(props) {
  const state = useUserState();
  const [products, setProducts] = useState([]);
  const productRef = useRef(null);

 
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("key");
  
    fetchData(id);
  }, [window.location.search]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchData = async (id) => {
    const postData = {
      categoryId: id,
    };
    const response = await getCategoryProducts(JSON.stringify(postData));
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

  const handleSearch = (input) => {
  
     console.log(input);
    // if (input !== "") {
    //   const postData = {
    //     searchTerm: input,
    //   };
    //   const response = await search(JSON.stringify(postData));
    //   const data = response.json();
    //   if (response.status === 200) {
    //     setProducts(data.data);
    //   } else if (response.status === 404) {
    //     Notify.info("No records found");
    //   } else if (response.status === 401) {
    //     logout();
    //   }
      if (input !== "") {
        const copy_products = [...productRef.current];
        console.log(copy_products);
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

  return (
    <MainLayout>
      {products && products.length > 0 ? (
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

export default Category;
