import {
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGOUT,
} from "../../store/constants/employeeLoginConstants";

import axios from "axios";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        //"auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/auth/employee-login",
      { email, password },
      config
    );

    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("employeeInfo", JSON.stringify(data));
    const token = data.results.data;
    localStorage.setItem("authToken", token);
   
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const employeeLogout = () => (dispatch) => {
  localStorage.removeItem("employeeInfo");


  dispatch({ type: EMPLOYEE_LOGOUT });
  document.location.href = "/employee-login";
};