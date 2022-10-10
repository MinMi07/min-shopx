import {
  PRODUCTS_LOADED_SUCCESS,
  PRODUCTS_LOADED_FAIL,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  FIND_PRODUCT,
} from '../contexts/constaints';

export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LOADED_SUCCESS:
      return {
        ...state,
        products: payload,
        productsLoading: false,
      };

    case PRODUCTS_LOADED_FAIL:
      return {
        ...state,
        products: [],
        productsLoading: false,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };

    case FIND_PRODUCT:
      return { ...state, product: payload };

    case UPDATE_PRODUCT:
      const newProduct = state.products.map((product) => (product._id === payload._id ? payload : product));

      return {
        ...state,
        products: newProduct,
      };

    default:
      return state;
  }
};
