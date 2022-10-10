import {
  BILLS_LOADED_SUCCESS,
  BILLS_LOADED_FAIL,
  ADD_BILL,
  DELETE_BILL,
  UPDATE_BILL,
  FIND_BILL,
} from '../contexts/constaints';

export const billReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case BILLS_LOADED_SUCCESS:
      return {
        ...state,
        bills: payload,
        billsLoading: false,
      };

    case BILLS_LOADED_FAIL:
      return {
        ...state,
        bills: [],
        billsLoading: false,
      };

    case ADD_BILL:
      return {
        ...state,
        bills: [...state.bills, payload],
      };

    case DELETE_BILL:
      return {
        ...state,
        bills: state.bills.filter((bill) => bill._id !== payload),
      };

    case FIND_BILL:
      return { ...state, bill: payload };

    case UPDATE_BILL:
      const newBill = state.bills.map((bill) => (bill._id === payload._id ? payload : bill));

      return {
        ...state,
        bills: newBill,
      };

    default:
      return state;
  }
};
