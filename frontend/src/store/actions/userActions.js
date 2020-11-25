import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../../store/constants/userConstants";

import setAuthToken from "../../utils/setAuthToken";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        //"auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/auth/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    const token = data.results.data;
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("authToken");
  localStorage.removeItem("employeeDetails");
  localStorage.removeItem("updateEmployee");
  localStorage.removeItem("organization");
  localStorage.removeItem("organizations");
  localStorage.removeItem("employee");
  localStorage.removeItem("employees");
  localStorage.removeItem("payroll");
  localStorage.removeItem("payrolls");
  localStorage.removeItem("announcements");
  localStorage.removeItem("announcement");
  localStorage.removeItem("attendence");
  localStorage.removeItem("attendences");
  localStorage.removeItem("cost");
  localStorage.removeItem("costs");
  localStorage.removeItem("leave");
  localStorage.removeItem("leaves");

  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/user/signup",
      { username, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.results.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.results.data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    const token = data.results.data;
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
