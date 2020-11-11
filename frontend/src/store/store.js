import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
} from "../store/reducers/userReducers";
import {
  createOrganizationReducer,
  organizationListReducer,
} from "../store/reducers/organizationReducer";
import {createEmployeeReducer, employeeListReducer,employeeDetailsReducer, employeeEditReducer, employeeDeleteReducer} from '../store/reducers/employeeReducers'
import {
  createAnnouncementReducer,
  announcementListReducer,
} from "../store/reducers/anouncementReducers";
import {createAttendenceReducer, attendenceListReducer} from "../store/reducers/attendenceReducer";
import {costListReducer, createCostReducer} from "../store/reducers/costReducers";
import {createPayrollReducer, payrollListReducer} from "../store/reducers/payrollReducer";
import {createLeaveReducer, leaveListReducer} from "../store/reducers/leavesReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addOrganization: createOrganizationReducer,
  listOfOrganization: organizationListReducer,
  addEmployee: createEmployeeReducer,
  detailsEmployee: employeeDetailsReducer,
  updateEmployee: employeeEditReducer,
  removeEmployee: employeeDeleteReducer,
  listOfEmployee: employeeListReducer,
  addAnnouncement: createAnnouncementReducer,
  listOfAnnouncement: announcementListReducer,
  addAttendence: createAttendenceReducer,
  listOfAttendence: attendenceListReducer,
  addCost: createCostReducer,
  listOfCost: costListReducer,
  addPayroll: createPayrollReducer,
  listOfPayroll: payrollListReducer,
  addLeave: createLeaveReducer,
  listOfLeave: leaveListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

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
