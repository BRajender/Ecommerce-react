import React from "react";
import { ProductCard } from "../cards";
//context
import { useUserDispatch, useUserState } from "../../context";
//actions
import * as ActionTypes from "../../constans/ActionTypes";
//router
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../services/products";
import { Notify } from "notiflix/build/notiflix-notify-aio";

function ProductTable(props) {
  const dispatch = useUserDispatch();
  const state = useUserState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCart = async (item) => {
    if (user !== null) {
      const postData = {
        productId: item.id,
        // productImage: item.productImage,
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
      } else if (response.status === 401) {
        logout();
      } else {
        Notify.failure(response.statusText);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <table className="table basic_table">
      <thead>
        <tr>
          <th>Item</th>
          {/* <th>Quantity</th> */}
          <th>Description</th>
          <th>Price</th>
          <th>Add</th>
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

                {/* <td>
                  <select>
                    <option value={item.quantity}>{item.quantity}</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </td> */}
                <td>{item.productDescription}</td>
                <td>{item.price}</td>

                <td>
                  <button
                    className="add_to_cart_btn"
                    onClick={() => handleCart(item)}
                  >
                    Add to cart
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default ProductTable;
