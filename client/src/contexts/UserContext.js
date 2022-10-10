import { createContext, useReducer, useState } from 'react';
import { userReducer } from '../reducers/userReducer';
import {
  apiUrl,
  USERS_LOADED_SUCCESS,
  USERS_LOADED_FAIL,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  FIND_USER,
} from './constaints';
import axios from 'axios';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // State
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
    users: [],
    usersLoading: true,
  });

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all Users
  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/user`);
      if (response.data.success) {
        dispatch({ type: USERS_LOADED_SUCCESS, payload: response.data.user });
      }
    } catch (error) {
      dispatch({ type: USERS_LOADED_FAIL });
    }
  };

  // Add User
  const addUser = async (newUser) => {
    console.log(newUser);
    try {
      const response = await axios.post(`${apiUrl}/admin/user/add`, newUser);
      if (response.data.success) {
        dispatch({ type: ADD_USER, payload: response.data.user });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/user/${userId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_USER, payload: userId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find user when user is updating user
  const findUser = (userId) => {
    const user = userState.users.find((user) => user._id === userId);
    dispatch({ type: FIND_USER, payload: user });
  };

  // Update user
  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/user/${updatedUser._id}`, updatedUser);
      if (response.data.success) {
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // user context data
  const userContextData = {
    userState,
    getUsers,
    showAddUserModal,
    setShowAddUserModal,
    showUpdateUserModal,
    setShowUpdateUserModal,
    addUser,
    showToast,
    setShowToast,
    deleteUser,
    findUser,
    updateUser,
  };

  return <UserContext.Provider value={userContextData}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
