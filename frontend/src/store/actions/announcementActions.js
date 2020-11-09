import axios from "axios";
import {
  CREATE_ANNOUNCEMENT_REQUEST,
  CREATE_ANNOUNCEMENT_SUCCESS,
  CREATE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_LIST_REQUEST,
  ANNOUNCEMENT_LIST_SUCCESS,
  ANNOUNCEMENT_LIST_FAIL,
} from "../constants/announcementConstants";

import setAuthToken from "../../utils/setAuthToken";

export const createAnnouncement = (message, organizationId) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({
      type: CREATE_ANNOUNCEMENT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/announcement",
      { message, organizationId },
      config
    );

    dispatch({
      type: CREATE_ANNOUNCEMENT_SUCCESS,
      payload: data.results.data,
    });

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    localStorage.setItem("announcement", JSON.stringify(data.results.data));
  } catch (error) {
    dispatch({
      type: CREATE_ANNOUNCEMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAnnouncement = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch({ type: ANNOUNCEMENT_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get(
      "http://localhost:4000/api/announcement",
      config
    );

    if (data.results) {
      dispatch({
        type: ANNOUNCEMENT_LIST_SUCCESS,
        payload: data.results.data,
      });
    }

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    localStorage.setItem("announcements", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
