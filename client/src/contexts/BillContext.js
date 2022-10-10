import { createContext, useReducer, useState } from 'react';
import { billReducer } from '../reducers/billReducer';
import {
  apiUrl,
  BILLS_LOADED_SUCCESS,
  BILLS_LOADED_FAIL,
  ADD_BILL,
  DELETE_BILL,
  UPDATE_BILL,
  FIND_BILL,
} from './constaints';
import axios from 'axios';

export const BillContext = createContext();

const BillContextProvider = ({ children }) => {
  // State
  const [billState, dispatch] = useReducer(billReducer, {
    bill: null,
    bills: [],
    billsLoading: true,
  });

  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showUpdateBillModal, setShowUpdateBillModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all Bills
  const getBills = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/bill`);
      if (response.data.success) {
        dispatch({ type: BILLS_LOADED_SUCCESS, payload: response.data.bill });
      }
    } catch (error) {
      dispatch({ type: BILLS_LOADED_FAIL });
    }
  };

  // Add Bill
  const addBill = async (newBill) => {
    console.log(newBill);
    try {
      const response = await axios.post(`${apiUrl}/admin/bill/add`, newBill);
      if (response.data.success) {
        dispatch({ type: ADD_BILL, payload: response.data.bill });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Add Bill
  const addBillUser = async (newBill) => {
    console.log(newBill);
    try {
      const response = await axios.post(`${apiUrl}/home/detail/:id`, newBill);
      if (response.data.success) {
        dispatch({ type: ADD_BILL, payload: response.data.bill });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // Delete bill
  const deleteBill = async (billId) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/bill/${billId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_BILL, payload: billId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find bill when user is updating bill
  const findBill = (billId) => {
    const bill = billState.bills.find((bill) => bill._id === billId);
    dispatch({ type: FIND_BILL, payload: bill });
  };

  // Update bill
  const updateBill = async (updatedBill) => {
    try {
      const response = await axios.put(`${apiUrl}/admin/bill/${updatedBill._id}`, updatedBill);
      if (response.data.success) {
        dispatch({ type: UPDATE_BILL, payload: response.data.bill });
        return response.data;
      }
    } catch (error) {
      return error.response.data ? error.response.data : { success: false, message: 'Server error' };
    }
  };

  // bill context data
  const billContextData = {
    billState,
    getBills,
    showAddBillModal,
    setShowAddBillModal,
    showUpdateBillModal,
    setShowUpdateBillModal,
    addBill,
    addBillUser,
    showToast,
    setShowToast,
    deleteBill,
    findBill,
    updateBill,
  };

  return <BillContext.Provider value={billContextData}>{children}</BillContext.Provider>;
};

export default BillContextProvider;
