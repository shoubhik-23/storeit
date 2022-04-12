import { Constants } from "../../constant";

const initialState = {
  products: [],
  loading: false,
  searchResults: [],
};
interface Action {
  type: string;
  payload?: any;
}
export const homeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Constants.FETCH_ALL_DATA_SUCCESS:
      return { ...state, products: action.payload.data, loading: false };
    case Constants.FETCH_ALL_DATA_FAILURE:
      return { ...state, loading: false };
    case Constants.UPDATE_SEARCH_RESULT:
      return { ...state, searchResults: action.payload.data };
    default: {
      return {
        ...state,
      };
    }
  }
};
