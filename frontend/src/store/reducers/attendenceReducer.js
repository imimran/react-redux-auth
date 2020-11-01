import {
  CREATE_ATTENDENCE_REQUEST,
  CREATE_ATTENDENCE_SUCCESS,
  CREATE_ATTENDENCE_FAIL,
  ATTENDENCE_LIST_REQUEST,
  ATTENDENCE_LIST_SUCCESS,
  ATTENDENCE_LIST_FAIL,
} from "../constants/attendenceConstants";

const initialState = {
  attendences: [],
};

export const createAttendenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ATTENDENCE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ATTENDENCE_SUCCESS:
      return {
        loading: false,
        attendence: action.payload,
      };
    case CREATE_ATTENDENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const attendenceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ATTENDENCE_LIST_REQUEST:
      return {
        loading: true,
      };
    case ATTENDENCE_LIST_SUCCESS:
      return { ...state, attendences: action.payload };
    case ATTENDENCE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
