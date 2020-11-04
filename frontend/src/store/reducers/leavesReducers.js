import {
  CREATE_LEAVES_FAIL,
  CREATE_LEAVES_REQUEST,
  CREATE_LEAVES_SUCCESS,
  LEAVES_LIST_FAIL,
  LEAVES_LIST_REQUEST,
  LEAVES_LIST_SUCCESS,
} from "../constants/leavesConstants";

const initialstate = {
    leaves: []
}

export const createLeaveReducer = ( state=initialstate, action)=>{
    switch(action.type){
        case CREATE_LEAVES_REQUEST:
            return{
                loading: true
            }
        case CREATE_LEAVES_SUCCESS:
            return{
                loading: false,
                leave: action.payload 
            } 
        case CREATE_LEAVES_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state           
    }
} 

export const leaveListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LEAVES_LIST_REQUEST:
      return {
        loading: true,
      };
    case LEAVES_LIST_SUCCESS:
      return {
        loading: false,
        leaves: action.payload,
      };
    case LEAVES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}; 

