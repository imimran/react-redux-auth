import axios from "axios";
import {
  CREATE_ATTENDENCE_REQUEST,
  CREATE_ATTENDENCE_SUCCESS,
  CREATE_ATTENDENCE_FAIL,
  ATTENDENCE_LIST_REQUEST,
  ATTENDENCE_LIST_SUCCESS,
  ATTENDENCE_LIST_FAIL,
} from "../constants/attendenceConstants";

import setAuthToken from "../../utils/setAuthToken";

export const createAttendence = (month, leaves) => async(dispatch) => {
    try {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
    dispatch({
        type: CREATE_ATTENDENCE_REQUEST
    }) 
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken")
        }
    }

    const { data } = await axios.post("http://localhost:4000/api/announcement", {month, leaves}, config);

    dispatch({
      type: CREATE_ATTENDENCE_SUCCESS,
      payload: data.results.data,
    });

     if (localStorage.token) {
       setAuthToken(localStorage.token);
     }

     localStorage.setItem('attendence', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: CREATE_ATTENDENCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const listAttendence = () => async(dispatch) =>{
    try {
        
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        dispatch({
            type: ATTENDENCE_LIST_REQUEST
        })
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken")
            }
        }

        const { data } = await axios.post(
          "http://localhost:4000/api/announcement",
          config
        );

        dispatch({
          type: ATTENDENCE_LIST_SUCCESS,
          payload: data.results.data,
        });

         if (localStorage.token) {
           setAuthToken(localStorage.token);
         }
         localStorage.setItem("attendences", JSON.stringify(data.results.data));
        
    } catch (error) {
          dispatch({
            type: ATTENDENCE_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}
