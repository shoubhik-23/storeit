import { Constants } from "../../constant";

const initialState = {
  login: false,
  userData: null,
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
      };
    case Constants.RETRIEVE_APP_STATE_SUCCESS:
      return {
        ...state,
        login: action.payload?.login,
        userid: action.payload?.userid,
      };

    case Constants.USER_LOGOUT:
      return {
        ...state,
        login: false,
        userid: null,
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
