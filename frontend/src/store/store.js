import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
} from "../store/reducers/userReducers";

//import setAuthToken from "../utils/setAuthToken";

import {
  createOrganizationReducer,
  organizationListReducer,
} from "../store/reducers/organizationReducer";

import {createEmployeeReducer, employeeListReducer} from '../store/reducers/employeeReducers'

import {
  createAnnouncementReducer,
  announcementListReducer,
} from "../store/reducers/anouncementReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addOrganization: createOrganizationReducer,
  listOfOrganization: organizationListReducer,
  addEmployee: createEmployeeReducer,
  listOfEmployee: employeeListReducer,
  addAnnouncement: createAnnouncementReducer,
  listOfAnnouncement: announcementListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//setAuthToken(localStorage.token);

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
