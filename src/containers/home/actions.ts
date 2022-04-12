import { Constants } from "../../constant";

export const getAllProducts = () => {
  return {
    type: Constants.FETCH_ALL_DATA,
  };
};

export const fetchProductsSuccess = (data: []) => {
  return {
    type: Constants.FETCH_ALL_DATA_SUCCESS,
    payload: {
      data: data,
    },
  };
};
export const fetchProductsFailure = (data: []) => {
  return {
    type: Constants.FETCH_ALL_DATA_FAILURE,
    payload: {
      data: [],
    },
  };
};
export const retrievingAppState = () => {
  return {
    type: Constants.RETRIEVE_APP_STATE,
  };
};
export const retrievingAppStateSuccess = (data?: any) => {
  return {
    type: Constants.RETRIEVE_APP_STATE_SUCCESS,
    payload: { ...data },
  };
};
export const updateSearchResult = (data?: any) => {
  return {
    type: Constants.UPDATE_SEARCH_RESULT,
    payload: {
      data: data,
    },
  };
};
