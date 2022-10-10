import { createContext, useReducer, useState } from 'react';
import { productReducer } from '../reducers/productReducer';
import {
  apiUrl,
  PRODUCTS_LOADED_SUCCESS,
  PRODUCTS_LOADED_FAIL,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  FIND_PRODUCT,
} from './constaints';
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  // State
  const [productState, dispatch] = useReducer(productReducer, {
    product: null,
    products: [],
    productsLoading: true,
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all Products
  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/product`);
      if (response.data.success) {
        dispatch({ type: PRODUCTS_LOADED_SUCCESS, payload: response.data.product });
      }
    } catch (error) {
      dispatch({ type: PRODUCTS_LOADED_FAIL });
    }
  };

  // Add Product
  const addProduct = async (newProduct) => {
    console.log(newProduct);
    try {
      const response = await axios.post(`${apiUrl}/admin/product/add`, newProduct);
      if (response.data.success) {
        dispatch({ type: ADD_PRODUCT, payload: response.data.product });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/product/${productId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_PRODUCT, payload: productId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find product when user is updating product
  const findProduct = (productId) => {
    const product = productState.products.find((product) => product._id === productId);
    dispatch({ type: FIND_PRODUCT, payload: product });
  };

  // Update product
  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/product/${updatedProduct._id}`, updatedProduct);
      if (response.data.success) {
        dispatch({ type: UPDATE_PRODUCT, payload: response.data.product });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // product context data
  const productContextData = {
    productState,
    getProducts,
    showAddProductModal,
    setShowAddProductModal,
    showUpdateProductModal,
    setShowUpdateProductModal,
    addProduct,
    showToast,
    setShowToast,
    deleteProduct,
    findProduct,
    updateProduct,
  };

  return <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
