import {
  CREATE_PAYROLL_REQUEST,
  CREATE_PAYROLL_SUCCESS,
  CREATE_PAYROLL_FAIL,
  PAYROLL_LIST_REQUEST,
  PAYROLL_LIST_SUCCESS,
  PAYROLL_LIST_FAIL,
} from "../constants/payrollConstants";

const initialState = {
  payrolls: [],
};

export const createPayrollReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYROLL_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PAYROLL_SUCCESS:
      return {
        loading: false,
        payroll: action.payload,
      };
    case CREATE_PAYROLL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const payrollListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYROLL_LIST_REQUEST:
      return {
        loading: true,
      };
    case PAYROLL_LIST_SUCCESS:
      return { ...state, payrolls: action.payload };
    case PAYROLL_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
