import { Notify } from "notiflix";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//service
import {
  addProductCategory,
  getProductCategories,
} from "../../services/products";
//context
import { useUserDispatch} from "../../context";
//actions
import * as ActionTypes from "../../constans/ActionTypes";

function CategoryForm(props) {
  const dispatch=useUserDispatch()
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login")
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      name: category,
    };
    const response = await addProductCategory(JSON.stringify(postData));
    const data = await response.json();
    if (response.status === 201) {
      props.handleclose()
      Notify.success("Product category added succesfully");
      fetchProductCategories()
    } else if (response.status === 409) {
      Notify.info("Product category already exist");
    } else if (response.status === 401) {
      logout();
    } else {
      Notify.failure(response.statusText);
    }
  };

  const fetchProductCategories = async () => {
    const response = await getProductCategories();
    const data = await response.json();
    if (response.status === 200) {
      dispatch({
        type: ActionTypes.GET_PRODUCT_CATEGORIES,
        payload: data.data,
      });
    } else if (response.status === 404) {
      dispatch({
        type: ActionTypes.GET_PRODUCT_CATEGORIES,
        payload: [],
      });
    } else if (response.status === 401) {
      logout()
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label> Category </Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={category}
          onChange={(e) => handleChange(e)}
          placeholder="Enter product category name"
          autoComplete="off"
        />
      </Form.Group>
      <Form.Group className="text-center mt-3">
        <Button type="submit" className="add_cat_btn">
          ADD
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CategoryForm;
