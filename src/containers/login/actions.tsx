import { Constants } from "../../constant";

export const signUpUser = (email?: any, password?: any, history?: any) => {
  return {
    type: Constants.USER_SIGN_UP,
    payload: {
      data: {
        email,
        password,
      },
      history,
    },
  };
};
export const loginUser = (email?: string, password?: string, history?: any) => {
  return {
    type: Constants.USER_LOGIN_IN,
    payload: {
      data: {
        email,
        password,
      },
      history,
    },
  };
};
export const loginSuccess = (userData?: any) => {
  return {
    type: Constants.USER_LOGIN_IN_SUCCESS,
    payload: {
      userData: userData,
    },
  };
};

export const logoutUser = (uid?: string) => {
  return {
    type: Constants.USER_LOGOUT,
  };
};

export const fetchCart = (cart?: any[]) => {
  return {
    type: Constants.FETCH_CART,
    payload: {
      data: cart,
    },
  };
};
