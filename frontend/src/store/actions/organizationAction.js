import axios from "axios";
import {
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_FAIL,
} from "../constants/organizationConstant";

import setAuthToken from "../../utils/setAuthToken";

export const createOrganization = (name, email, phone, address) => async (
  dispatch
) => {

 
  try {

       if (localStorage.token) {
         setAuthToken(localStorage.token);
       }
    
    dispatch({
      type: CREATE_ORGANIZATION_REQUEST,
    });
   

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:4000/api/company",
      { name, email, phone, address },
      config
    );

    dispatch({
      type: CREATE_ORGANIZATION_SUCCESS,
      payload: data,
    });
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }

    localStorage.setItem("organization", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_ORGANIZATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
