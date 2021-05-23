const initialState = {
  items: [],
  visibleItems: [],
  cart: [],
};

export const reducer = (state = initialState, action) => {
  if (action.type === "getIndex") {
    return { ...state, items: action.data, visibleItems: action.data };
  }
  if (action.type === "search") {
    let value = action.data.value;
    let items = action.data.items;
    if (value) {
      let filter = items.filter(
        (el) => el.title.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      return { ...state, visibleItems: filter };
    } else {
      return { ...state, visibleItems: items };
    }
  }
  if (action.type === "cartCount") {
    return { ...state, cart: action.data };
  }

  return state;
};
