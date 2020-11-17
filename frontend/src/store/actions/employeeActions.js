import axios from "axios";
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
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
} from "../constants/employeeConstants";

import setAuthToken from "../../utils/setAuthToken";

export const createEmployee = (
  name,
  email,
  designation,
  department,
  organizationId,
  image
) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({
      type: CREATE_EMPLOYEE_REQUEST,
    });

     

    const config = {
      headers: {
        // "Content-Type": "application/json",
        //  'Accept': "application/json",
        "Content-Type": "multipart/form-data",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/employee", 
      { name, email, designation, department, organizationId, image} ,
     config
    );

    dispatch({
      type: CREATE_EMPLOYEE_SUCCESS,
      payload: data.results.data,
    });
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    localStorage.setItem("employee", JSON.stringify(data.results.data));
  } catch (error) {
    dispatch({
      type: CREATE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const employeeDetails = (id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get(
      `http://localhost:4000/api/employee/${id}`,
      config
    );

    dispatch({
      type: EMPLOYEE_DETAILS_SUCCESS,
      payload: data.results.data,
    });

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("employeeDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEmployee = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({ type: EMPLOYEE_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/employee",
      config
    );
    // console.log(data.results.data);
    if (data.results) {
      dispatch({
        type: EMPLOYEE_LIST_SUCCESS,
        payload: data.results.data,
      });
    }

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("employees", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch({
      type: EMPLOYEE_DELETE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    await axios.delete(`http://localhost:4000/api/employee/${id}`, config);

    dispatch({
      type: EMPLOYEE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editEmployee = (employee) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch({
      type: EMPLOYEE_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.put(
      `http://localhost:4000/api/employee/${employee.id}`,
      employee,
      config
    );

    dispatch({
      type: EMPLOYEE_UPDATE_SUCCESS,
      payload: data.results.data,
    });

    console.log(data.results.data);

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("updateEmployee", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: EMPLOYEE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
