import { API_POINT, Token } from "../constant/Api";
export const getIndex = () => {
  return fetch(`${API_POINT}`);
};

export const getProductDetail = (productId) => {
  return fetch(`${API_POINT}/product/${productId}`);
};

export const postLogin = (data) => {
  return fetch(`${API_POINT}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
export const getCart = () => {
  return fetch(`${API_POINT}/cart`, {
    headers: {
      Authorization: `${Token()}`,
    },
  });
};
export const addToCart = (productId) => {
  return fetch(`${API_POINT}/cart/add/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Token()}`,
    },
  });
};
export const addLocalToCart = (cartArray, token) => {
  return fetch(`${API_POINT}/cart/localAdd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ localCartArray: cartArray }),
  });
};

export const postSignUp = (data) => {
  return fetch(`${API_POINT}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
export const getUser = () => {
  return fetch(`${API_POINT}/user`, {
    headers: {
      Authorization: `${Token()}`,
    },
  });
};
export const addAddress = (data) => {
  return fetch(`${API_POINT}/user/add-address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Token()}`,
    },
    body: JSON.stringify(data),
  });
};
export const deleteFromCart = (data, all) => {
  return fetch(`${API_POINT}/cart/delete?all=${all}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${Token()}`,
    },
    body: JSON.stringify(data),
  });
};
export const deleteFullCart = () => {
  return fetch(`${API_POINT}/cart/deleteCart`, {
    method: "POST",
    headers: {
      Authorization: `${Token()}`,
    },
  });
};
export const postOrder = () => {
  return fetch(`${API_POINT}/order`, {
    method: "POST",
    headers: {
      Authorization: `${Token()}`,
    },
  });
};
export const getOrders = () => {
  return fetch(`${API_POINT}/order`, {
    headers: {
      Authorization: `${Token()}`,
    },
  });
};
export const postReset = (data) => {
  return fetch(`${API_POINT}/auth/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const postNewPassword = (token, data) => {
  return fetch(`${API_POINT}/auth/newpassword-reset/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
