import React, { useState } from "react";
import { ProductCard } from "../cards";
//context
import { useUserDispatch, useUserState } from "../../context";
//actions
import * as ActionTypes from "../../constans/ActionTypes";
//router
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseCartQuantity,
  removeProductFromCart,
} from "../../services/products";
import { Notify } from "notiflix/build/notiflix-notify-aio";

function CartTable(props) {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate()

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const increaseQuantity = async (item) => {
    const postData = {
      productId: item.productId,
      // productImage:item.productImage,
      userId: user.userId,
      quantity: 1,
    };
    const response = await addToCart(JSON.stringify(postData));
    const data = await response.json();

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.CART_COUNT,
        payload: data.totalProductsInCart,
      });
    }
    else if(response.status===401){
      logout()
    }
    else{
      Notify.failure(response.statusText)
    }
  };

  const deleteFromCart = async (item) => {
    const postData = {
      productId: item.productId,
      userId: user.userId,
      quantity: 1,
    };
    const response = await decreaseCartQuantity(JSON.stringify(postData));
    const data = await response.json();

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.CART_COUNT,
        payload: data.totalProductsInCart,
      });
    } else if (response.status === 401) {
      logout();
    } else {
      Notify.failure(response.statusText);
    }
  };

  const removeCart = async (item) => {
    const postData = {
      productId: item.productId,
      userId: user.userId,
    };
    const response = await removeProductFromCart(JSON.stringify(postData));
    const data = await response.json();

    if (response.status === 200) {
      dispatch({
        type: ActionTypes.CART_COUNT,
        payload: data.totalProductsInCart,
      });
    } else if (response.status === 401) {
      logout();
    } else {
      Notify.failure(response.statusText);
    }
  };

  return (
    <table className="table basic_table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <ProductCard data={item} />
                </td>

                <td>
                  <div className="cart_quantity_wrapper">
                    <button
                      className="cart_quantity_btn"
                      onClick={() => deleteFromCart(item)}
                    >
                      -
                    </button>
                    <p className="mb-0 ms-2">{item.quantity}</p>
                    <button
                      className="cart_quantity_btn ms-auto"
                      onClick={() => increaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.productDescription}</td>
                <td>{item.totalPrice}</td>

                <td>
                  <button
                    className="delete_product_btn"
                    onClick={() => removeCart(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default CartTable;
