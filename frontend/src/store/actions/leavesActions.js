import {
  CREATE_LEAVES_FAIL,
  CREATE_LEAVES_REQUEST,
  CREATE_LEAVES_SUCCESS,
  LEAVES_LIST_FAIL,
  LEAVES_LIST_REQUEST,
  LEAVES_LIST_SUCCESS,
} from "../constants/leavesConstants";

import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const createLeave = (leaveForDays, employeeId) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({
      type: CREATE_LEAVES_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/leave-request",
      { leaveForDays, employeeId },
      config
    );

    dispatch({
      type: CREATE_LEAVES_SUCCESS,
      payload: data,
    });

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    localStorage.setItem("leave", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_LEAVES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLeave = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({ type: LEAVES_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/leave-request",
      config
    );

    if (data.results) {
      dispatch({
        type: LEAVES_LIST_SUCCESS,
        payload: data.results.data,
      });
    }

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("leaves", JSON.stringify(data.results.data));
  } catch (error) {
    dispatch({
      type: LEAVES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
