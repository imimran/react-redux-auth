import {
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_FAIL,
  CREATE_ORGANIZATION_SUCCESS,
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
