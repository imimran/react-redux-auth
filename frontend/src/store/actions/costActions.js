import {
  COST_LIST_REQUEST,
  COST_LIST_SUCCESS,
  COST_LIST_FAIL,
  CREATE_COST_REQUEST,
  CREATE_COST_SUCCESS,
  CREATE_COST_FAIL,
} from "../constants/costConstants";

import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const createCost = (staffSalary, officeRent, utilityBill) => async (
  dispatch
) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({
      type: CREATE_COST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/cost",
      { staffSalary, utilityBill, officeRent },
      config
    );

    dispatch({
      type: CREATE_COST_SUCCESS,
      payload: data.results.data,
    });

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    localStorage.setItem("cost", JSON.stringify(data.results.data));

  } catch (error) {
    dispatch({
      type: CREATE_COST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCost = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({ type: COST_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/cost",
      config
    );

    if (data.results) {
      dispatch({
        type: COST_LIST_SUCCESS,
        payload: data.results.data,
      });
    }

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("costs", JSON.stringify(data.results.data));
  } catch (error) {
    dispatch({
      type: COST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
