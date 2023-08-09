import React from "react";
import * as ActionTypes from "../constans/ActionTypes";
import { useNavigate } from "react-router-dom";
import { getProductCategories, getProductsInCart } from "../services/products";
import { Notify } from "notiflix/build/notiflix-notify-aio";
const initialState = {
  cart_count: 0,
  explore_product: true,
  product_categories: [],
};

const UserStateContext = React.createContext(initialState);
const UserDispatchContext = React.createContext(undefined);

const userReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CART_COUNT:
      return {
        ...state,
        cart_count: action.payload,
      };
    case ActionTypes.EXPLORE_PRODUCT:
      return {
        ...state,
        explore_product: action.payload,
      };
    case ActionTypes.GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        product_categories: action.payload,
      };

    default:
      return state;
  }
};

export const UserContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    fetchProductCategories();
    if (user !== null) {
      fetchCartCount(user.userId);
    }
  }, []);
  
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
       localStorage.removeItem("user")
       Notify.failure("Session expired")
       window.location.reload()
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
        localStorage.removeItem("user");
        Notify.failure("Session expired");
        window.location.reload();
    }
  };

  return (
    <>
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider   >
          {props.children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    </>
  );
};

export const useUserState = () => {
  const state = React.useContext(UserStateContext);
  return state;
};

export const useUserDispatch = () => {
  const dispatch = React.useContext(UserDispatchContext);
  return dispatch;
};
