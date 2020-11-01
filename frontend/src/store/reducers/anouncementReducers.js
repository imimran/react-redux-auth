import {
  CREATE_ANNOUNCEMENT_REQUEST,
  CREATE_ANNOUNCEMENT_SUCCESS,
  CREATE_ANNOUNCEMENT_FAIL,
  ANNOUNCEMENT_LIST_REQUEST,
  ANNOUNCEMENT_LIST_SUCCESS,
  ANNOUNCEMENT_LIST_FAIL,
} from "../constants/announcementConstants";

const initialState = {
  announcements: [],
};

export const createAnnouncementReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        loading: false,
        announcement: action.payload,
      };
    case CREATE_ANNOUNCEMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const announcementListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_LIST_REQUEST:
      return {
        loading: true,
      };
    case ANNOUNCEMENT_LIST_SUCCESS:
      return { ...state, announcements: action.payload };
    case ANNOUNCEMENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
