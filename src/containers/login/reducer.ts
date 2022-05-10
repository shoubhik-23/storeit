import { Constants } from "../../constant";

const initialState = {
  login: false,
  userData: {},
  userid: null,
  cart: [],
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Constants.USER_LOGIN_IN_SUCCESS:
      return {
        ...state,
        login: true,
        userid: action.payload.userData?.uid,
        userData: action.payload.userData,
      };
    case Constants.RETRIEVE_APP_STATE_SUCCESS:
      return {
        ...state,
        login: action.payload?.login,
        userid: action.payload?.userid,
        userData: action.payload?.userData,
      };

    case Constants.USER_LOGOUT:
      return {
        ...state,
        login: false,
        userid: null,
        userData: {},
      };
    case Constants.FETCH_CART:
      return {
        ...state,
        cart: action.payload?.data,
      };
    default:
      return { ...state };
  }
};
