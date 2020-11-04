import axios from "axios";
import {
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
} from "../constants/employeeConstants";

import setAuthToken from "../../utils/setAuthToken";

export const createEmployee = (name, email, designation, department) => async (
  dispatch
) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({
      type: CREATE_EMPLOYEE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/employee",
      { name, email, designation, department },
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