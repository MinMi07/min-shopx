export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/api'
    : 'https://peaceful-fortress-76879.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'tokenStorage';

// category
export const CATEGORYS_LOADED_FAIL = 'CATEGORYS_LOADED_FAIL';
export const CATEGORYS_LOADED_SUCCESS = 'CATEGORYS_LOADED_SUCCESS';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const FIND_CATEGORY = 'FIND_CATEGORY';

// blog
export const BLOGS_LOADED_SUCCESS = 'BLOGS_LOADED_SUCCESS';
export const BLOGS_LOADED_FAIL = 'BLOGS_LOADED_FAIL';
export const ADD_BLOG = 'ADD_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';
export const UPDATE_BLOG = 'UPDATE_BLOG';
export const FIND_BLOG = 'FIND_BLOG';

// product
export const PRODUCTS_LOADED_SUCCESS = 'PRODUCTS_LOADED_SUCCESS';
export const PRODUCTS_LOADED_FAIL = 'PRODUCTS_LOADED_FAIL';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FIND_PRODUCT = 'FIND_PRODUCT';

// bill
export const BILLS_LOADED_SUCCESS = 'BILLS_LOADED_SUCCESS';
export const BILLS_LOADED_FAIL = 'BILLS_LOADED_FAIL';
export const ADD_BILL = 'ADD_BILL';
export const DELETE_BILL = 'DELETE_BILL';
export const UPDATE_BILL = 'UPDATE_BILL';
export const FIND_BILL = 'FIND_BILL';

// account
export const USERS_LOADED_SUCCESS = 'USERS_LOADED_SUCCESS';
export const USERS_LOADED_FAIL = 'USERS_LOADED_FAIL';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const FIND_USER = 'FIND_USER';
