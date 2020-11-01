import {
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
} from "../constants/employeeConstants";

const initialState = {
  employees: [],
};

export const createEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        employee: action.payload,
      };
    case CREATE_EMPLOYEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const employeeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return {
        loading: true,
      };
    case EMPLOYEE_LIST_SUCCESS:
      return { ...state, employees: action.payload };
    case EMPLOYEE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
