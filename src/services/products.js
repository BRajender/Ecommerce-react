import { BASE_URL } from "../constans/api_routes.js";

//Add productCategories
export const addProductCategory=async(data)=>{
  const response = await fetch(`${BASE_URL}/product/addProductCategory`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;

}






//Fetch product categories
export const getProductCategories = async () => {
  const response = await fetch(`${BASE_URL}/product/getProductCategory`, {
    mode: "cors",
    headers: {
      Authorization: getToken(),
    },
    method: "POST",
  });
  return response;
};

//Add product
export const addProduct = async (data) => {
  const response = await fetch(`${BASE_URL}/product/addProduct`, {
    mode: "cors",
    headers: {
      // 'Content-Type': 'multipart/form-data',
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//get product

export const getProducts = async (data) => {
  const response = await fetch(`${BASE_URL}/product/getProducts`, {
    mode: "cors",
   method: "POST",
  });
  return response;
};

//Delete product
export const deleteProduct = async (data) => {
  const response = await fetch(`${BASE_URL}/product/deleteProduct`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//retrive product details
export const getProductDetails = async (data) => {
  const response = await fetch(`${BASE_URL}/product/getProducts`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//category filters
export const getCategoryProducts = async (data) => {
  const response = await fetch(`${BASE_URL}/product/getProducts`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//edit product
export const updateProduct = async (data) => {
  const response = await fetch(`${BASE_URL}/product/editProduct`, {
    mode: "cors",
    headers: {
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//add to cart
export const addToCart=async(data)=>{
  const response = await fetch(`${BASE_URL}/product/addToCart`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
}

//get products in cart
export const getProductsInCart= async (data) => {
  const response = await fetch(`${BASE_URL}/product/getCartDetails`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};


//Decrease cart count
export const decreaseCartQuantity = async (data) => {
  const response = await fetch(`${BASE_URL}/product/deleteFromCart`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//remove product from cart
export const removeProductFromCart = async (data) => {
  const response = await fetch(`${BASE_URL}/product/removeFromCart`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};

//checkout
export const checkoutOrders=async(data)=>{
  const response = await fetch(`${BASE_URL}/product/checkout`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;

}

//Fetch orders
export const fetchOrders = async (data) => {
  const response = await fetch(`${BASE_URL}/product/fetchOrders`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};


//search
export const search = async (data) => {
  const response = await fetch(`${BASE_URL}/search`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    method: "POST",
    body: data,
  });
  return response;
};





//Token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user === null ? "" : user.token;
  return token;
};
