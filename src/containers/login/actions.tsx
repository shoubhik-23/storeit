import { Constants } from "../../constant";

export const signInUser = (email?: any, password?: any) => {
  return {
    type: Constants.USER_SIGN_UP,
    payload: {
      data: {
        email,
        password,
      },
    },
  };
};
export const loginUser = (email?: any, password?: any) => {
  return {
    type: Constants.USER_LOGIN_IN,
    payload: {
      data: {
        email,
        password,
      },
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
