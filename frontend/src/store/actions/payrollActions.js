import {
  CREATE_PAYROLL_REQUEST,
  CREATE_PAYROLL_SUCCESS,
  CREATE_PAYROLL_FAIL,
  PAYROLL_LIST_REQUEST,
  PAYROLL_LIST_SUCCESS,
  PAYROLL_LIST_FAIL,
} from "../constants/payrollConstants";

import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const createPayroll = (salary) => async (
  dispatch
) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({
      type: CREATE_PAYROLL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/payroll",
      {  salary },
      config
    );

    dispatch({
      type: CREATE_PAYROLL_SUCCESS,
      payload: data.results.data,
    });

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    localStorage.setItem("payroll", JSON.stringify(data.results.data));
  } catch (error) {
    dispatch({
      type: CREATE_PAYROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPayroll = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({ type: PAYROLL_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get("http://localhost:4000/api/payroll", config);

    if (data.results) {
      dispatch({
        type: PAYROLL_LIST_SUCCESS,
        payload: data.results.data,
      });
    }

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("payrolls", JSON.stringify(data.results.data));
  } catch (error) {
    dispatch({
      type: PAYROLL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
