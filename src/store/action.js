import { Token } from "../constant/Api";
import { getCart, getIndex } from "../service/dataService";

export const getAllItems = () => {
  return (dispatch) => {
    getIndex()
      .then((resp) => resp.json())
      .then((data) => {
        return dispatch({ type: "getIndex", data: data.data });
      })
      .catch((err) => console.log(err));
  };
};
export const onSearchHandler = (value, visibleItems, items) => {
  return {
    type: "search",
    data: {
      value: value,
      visibleItems: visibleItems,
      items: items,
    },
  };
};

export const setCart = () => {
  return (dispatch) => {
    if (Token()) {
      getCart()
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message === "success") {
            return dispatch({ type: "cartCount", data: data.data });
          }
        })
        .catch((err) => console.log(err));
    } else {
      return dispatch({
        type: "cartCount",
        data: JSON.parse(localStorage.getItem("cart")),
      });
    }
  };
};
