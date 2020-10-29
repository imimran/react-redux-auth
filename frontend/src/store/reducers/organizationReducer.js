import {
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_FAIL,
  CREATE_ORGANIZATION_SUCCESS,
  ORGANIZATION_LIST_REQUEST,
  ORGANIZATION_LIST_SUCCESS, ORGANIZATION_LIST_FAIL
} from "../constants/organizationConstant";

const initialState = {
  organizations: [],
};

export const createOrganizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        loading: false,
        organization: action.payload,
      };
    case CREATE_ORGANIZATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const organizationListReducer = (state = initialState, action) => {
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case ORGANIZATION_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORGANIZATION_LIST_SUCCESS:
      return { ...state, organizations: action.payload };
    case ORGANIZATION_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
