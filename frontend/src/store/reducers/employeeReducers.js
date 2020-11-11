import {
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_RESET,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL
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


export const employeeDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case EMPLOYEE_DETAILS_SUCCESS:
      return { ...state, employee: action.payload };
    case EMPLOYEE_DETAILS_FAIL:
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

export const employeeEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_REQUEST:
      return { loading: true };
    case EMPLOYEE_UPDATE_SUCCESS:
      return { loading: false, success: true, employee: action.payload };
    case EMPLOYEE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_UPDATE_RESET:
      return { employee: {} };
    default:
      return state;
  }
};

export const employeeDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_DELETE_REQUEST:
      return { loading: true };
    case EMPLOYEE_DELETE_SUCCESS:
      return { loading: false, success: true, employee: action.payload };
    case EMPLOYEE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

