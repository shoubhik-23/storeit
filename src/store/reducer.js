const initialState = {
  items: [],
  visibleItems: [],
  cart: [],
  searchOn: false,
  page: 1,
  totalPage: 1,
  recordsPerPage: window.screen.width <= 600 ? 6 : 12,
};

export const reducer = (state = initialState, action) => {
  if (action.type === "getIndex") {
    return {
      ...state,
      items: action.data,
      visibleItems: action.data,
      totalPage: Math.ceil(action.data.length / state.recordsPerPage),
    };
  }
  if (action.type === "search") {
    let value = action.data.value;
    let items = action.data.items;
    if (value) {
      let filter = items.filter(
        (el) =>
          el.title.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
          el.category.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      return {
        ...state,
        visibleItems: filter,

        totalPage: Math.ceil(filter.length / state.recordsPerPage),
        page: 1,
      };
    } else {
      return {
        ...state,
        visibleItems: items,
        page: 1,
        totalPage: Math.ceil(items.length / state.recordsPerPage),
      };
    }
  }
  if (action.type === "cartCount") {
    return { ...state, cart: action.data };
  }
  if (action.type === "searchOn") {
    return { ...state, searchOn: true };
  }
  if (action.type === "searchOff") {
    return { ...state, searchOn: false };
  }
  return state;
};
