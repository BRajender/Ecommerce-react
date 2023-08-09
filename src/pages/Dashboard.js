import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
// React Bootstrap
import { Container, Row, Col, Image, Nav, Tab, Button } from "react-bootstrap";
//components
import { AdminTable } from "../components/tables";
import { PrimaryModal, AddProductCategoryModal } from "../components/elements";
import { ProductForm } from "../components/forms";
//context
import { useUserState, useUserDispatch } from "../context";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Report } from "notiflix/build/notiflix-report-aio";
//srvice
import {
  getProducts,
  deleteProduct,
  getProductDetails,
  getCategoryProducts,
} from "../services/products";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const state = useUserState();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [tabKey, setTabkey] = useState("all");
  const [showCategoryModal, setCategoryModal] = useState(false);

  const productRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchProducts = async () => {
    const response = await getProducts();
    const data = await response.json();
    if (response.status === 200) {
      setProducts(data.data);
      productRef.current = data.data;
    } else if (response.status === 404) {
      setProducts([]);
    } else if (response.status === 401) {
      logout();
    } else {
      Notify.failure(response.statusText);
    }
  };

  const handleFilter = async (cat) => {
    setTabkey(cat);
    if (cat === "all") {
      setProducts(productRef.current);
    } else {
      const postData = {
        categoryId: cat,
      };
      const response = await getCategoryProducts(JSON.stringify(postData));
      const data = await response.json();

      if (response.status === 200) {
        setProducts(data.data);
      } else if (response.status === 401) {
        logout();
      } else if (response.status === 404) {
        setProducts([]);
      } else {
        Notify.failure(response.statusText);
      }
    }
  };

  const removeProduct = async (id) => {
    const postData = {
      productId: id,
    };
    const response = await deleteProduct(JSON.stringify(postData));
    const data = await response.json();
    if (response.status === 200) {
      Notify.success("Product deleted successfully");
      fetchProducts();
    } else if (response.status === 401) {
      logout();
    } else if (response.status === 404) {
      Report.info("", "No data found", "Okay");
    } else {
      Notify.failure(response.statusText);
    }
  };

  const fetchProductDetails = async (id) => {
    const postData = {
      productId: id,
    };
    const response = await getProductDetails(JSON.stringify(postData));
    const data = await response.json();
    if (response.status === 200) {
      setProductDetails(data.data[0]);
    } else if (response.status === 404) {
      Report.info("", "No data found", "Okay");
    } else if (response.status === 401) {
      logout();
    } else {
      Notify.failure(response.statusText);
    }
  };

  const handleModalOpen = () => {
    // setEditMode(false)
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
    setEditMode(false);
  };

  const handleEditMode = (id) => {
    setEditMode(true);
    setShow(true);
    fetchProductDetails(id);
  };

  const handleCategoryModal = () => {
    setCategoryModal(true);
  };

  const handleCategoryModalClose = () => {
    setCategoryModal(false);
  };

  return (
    <MainLayout>
      {/* <div className="w-100 add_product_btn_container"></div> */}
      {state && state.product_categories.length > 0 ? (
        <>
          <Row className="w-100">
            <Col md="4"></Col>
            <Col md="4"></Col>
            <Col md="4">
              <Button
                className="add_cat_btn add_cat_btn_spl mt-3"
                onClick={() => handleCategoryModal()}
              >
                Add Category
              </Button>
            </Col>
          </Row>
          <Tab.Container defaultActiveKey="all">
            <Nav className="rounded-bottom bg-white shadow dashboard_nav px-5 py-2">
              <Nav.Item onClick={() => handleFilter("all")}>
                <Nav.Link eventKey="all" className="dashboard_nav_link">
                  All
                </Nav.Link>
              </Nav.Item>
              {state &&
                state.product_categories.length > 0 &&
                state.product_categories.map((item) => {
                  return (
                    <Nav.Item
                      key={item.id}
                      onClick={() => handleFilter(item.id)}
                    >
                      <Nav.Link
                        eventKey={item.id}
                        className="dashboard_nav_link"
                      >
                        {item.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}

              <Button
                className="add_product_btn ms-auto"
                onClick={() => handleModalOpen()}
              >
                Add product
              </Button>
            </Nav>
            <Tab.Content>
              {/* <Tab.Pane eventKey="all">
                {products && products.length > 0 ? (
                  <div className="tableContainer tableFixHead">
                    <AdminTable
                      data={products}
                      handleedit={handleEditMode}
                      removeproduct={removeProduct}
                    />
                  </div>
                ) : (
                  <div className="landing-container">
                    <h1 className="mt-5">
                      There is nothing . No records Found{" "}
                    </h1>
                  </div>
                )}
              </Tab.Pane> */}
              <Tab.Pane eventKey={tabKey}>
                {products && products.length > 0 ? (
                  <div className="tableContainer tableFixHead">
                    <AdminTable
                      data={products}
                      handleedit={handleEditMode}
                      removeproduct={removeProduct}
                      edit={editMode}
                    />
                  </div>
                ) : (
                  <div className="landing-container">
                    <h1 className="mt-5">
                      There is nothing . No records Found{" "}
                    </h1>
                  </div>
                )}
              </Tab.Pane>
              {/* <Tab.Pane eventKey={tabKey}>
              {products && products.length > 0 ? (
                <div className="tableContainer tableFixHead">
                  <AdminTable
                    data={products}
                    handleedit={handleEditMode}
                    removeproduct={removeProduct}
                    
                  />
                </div>
              ) : (
                <div className="landing-container">
                  <h1 className="mt-5">There is nothing . No records Found </h1>
                </div>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="Fragments">
              {products && products.length > 0 ? (
                <div className="tableContainer tableFixHead">
                  <AdminTable
                    data={products}
                    handleedit={handleEditMode}
                    removeproduct={removeProduct}
                    
                  />
                </div>
              ) : (
                <div className="landing-container">
                  <h1 className="mt-5">There is nothing . No records Found </h1>
                </div>
              )}
            </Tab.Pane> */}
            </Tab.Content>
          </Tab.Container>
        </>
      ) : (
        <div className="landing-container">
          <h1>There is nothing . Let's add some Categories. </h1>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <Button
                className="add_product_btn mt-3"
                onClick={() => handleCategoryModal()}
              >
                Add Category
              </Button>
            </Col>
            <Col md="4"></Col>
          </Row>
        </div>
      )}

      <PrimaryModal
        centered
        show={show}
        backdrop="static"
        className="custom-modal"
        handleclose={handleModalClose}
        edit={editMode}
      >
        <ProductForm
          handleclose={handleModalClose}
          fetchproducts={fetchProducts}
          productdetails={productDetails}
          edit={editMode}
          seteditmode={setEditMode}
        />
      </PrimaryModal>

      <AddProductCategoryModal
        centered
        show={showCategoryModal}
        backdrop="static"
        // className="custom-modal"
        handleclose={handleCategoryModalClose}
      />
    </MainLayout>
  );
}

export default Dashboard;
