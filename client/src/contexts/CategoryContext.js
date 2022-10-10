import { createContext, useReducer, useState } from 'react';
import { categoryReducer } from '../reducers/categoryReducer';
import {
  apiUrl,
  CATEGORYS_LOADED_FAIL,
  CATEGORYS_LOADED_SUCCESS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  FIND_CATEGORY,
} from './constaints';
import axios from 'axios';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  // State
  const [categoryState, dispatch] = useReducer(categoryReducer, {
    category: null,
    categorys: [],
    categorysLoading: true,
  });

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all categorys
  const getCategorys = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/category`);
      if (response.data.success) {
        dispatch({ type: CATEGORYS_LOADED_SUCCESS, payload: response.data.category });
      }
    } catch (error) {
      dispatch({ type: CATEGORYS_LOADED_FAIL });
    }
  };

  // Add category
  const addCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/category/add`, newCategory);

      if (response.data.success) {
        dispatch({ type: ADD_CATEGORY, payload: response.data.category });
        return response.data;
      }
      console.log(2);
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/category/${categoryId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_CATEGORY, payload: categoryId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find category when user is updating category
  const findCategory = (categoryId) => {
    const category = categoryState.categorys.find((category) => category._id === categoryId);
    dispatch({ type: FIND_CATEGORY, payload: category });
  };

  // Update category
  const updateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/category/${updatedCategory._id}`, updatedCategory);
      if (response.data.success) {
        dispatch({ type: UPDATE_CATEGORY, payload: response.data.category });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // category context data
  const categoryContextData = {
    categoryState,
    getCategorys,
    showAddCategoryModal,
    setShowAddCategoryModal,
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
    addCategory,
    showToast,
    setShowToast,
    deleteCategory,
    findCategory,
    updateCategory,
  };

  return <CategoryContext.Provider value={categoryContextData}>{children}</CategoryContext.Provider>;
};

export default CategoryContextProvider;
