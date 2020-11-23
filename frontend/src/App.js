import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import OrganizationScreen from './screens/OrganizationScreen'
import OrganizationListScreen from "./screens/OrganizationListScreen";
import  PrivateRoute from "./utils/privateRoute";
import CreateEmployeeScreen from './screens/CreateEmployeeScreen'
import EmployeeListScreen from './screens/EmployeeListScreen'
import AnnouncementListScreen from "./screens/AnnouncementListScreen";
import CreateAnouncementScreen from './screens/CreateAnnouncementScreen'
import CreateAttendenceScreen from './screens/CreateAttendenceScreen'
import AttendenceListScreen from './screens/AttendenceListScreen'
import CreatePayrollScreen from './screens/CreatePayrollScreen'
import PayrollListScreen from './screens/PayrollListScreen'
import CreateCostScreen from './screens/CreateCostScreen'
import CostListScreen from './screens/CostListScreen'
import CreateLeavesScreen from './screens/CreateLeavesScreen'
import LeaveListScreen from './screens/LeaveListScreen'
import UpdateEmployeeScreen from './screens/UpdateEmployeeScreen'
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen'
import ErrorScreen from './screens/ErrorScreen';
import { useDispatch, useSelector } from "react-redux";
import EmployeeLoginScreen from './screens/EmployeeLoginScreen';



const App = () => {
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;
 
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/login" component={LoginScreen} />
            <Route path="/employee-login" component={EmployeeLoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <PrivateRoute
              path="/announcements"
              component={AnnouncementListScreen}
            />
            <PrivateRoute
              path="/announcement/create"
              component={CreateAnouncementScreen}
            />

            <PrivateRoute path="/leave/create" component={CreateLeavesScreen} />

            <PrivateRoute path="/leaves" component={LeaveListScreen} />

            <PrivateRoute path="/cost/create" component={CreateCostScreen} />

            <PrivateRoute
              path="/payroll/create"
              component={CreatePayrollScreen}
            />

            <PrivateRoute path="/payrolls" component={PayrollListScreen} />

            <PrivateRoute
              path="/attendence/create"
              component={CreateAttendenceScreen}
            />
            <PrivateRoute
              path="/attendences"
              component={AttendenceListScreen}
            />

            {userInfo && userInfo.results && userInfo.results.isOrganizer && (
              <>
                <PrivateRoute path="/costs" component={CostListScreen} />

                <PrivateRoute
                  path="/employee/create"
                  component={CreateEmployeeScreen}
                />

                <PrivateRoute
                  path="/employee/edit/:id"
                  component={UpdateEmployeeScreen}
                />

                <PrivateRoute
                  path="/employee/:id"
                  component={EmployeeDetailsScreen}
                  exact
                />

                <PrivateRoute
                  path="/employees"
                  component={EmployeeListScreen}
                />

                <PrivateRoute
                  path="/organization/create"
                  component={OrganizationScreen}
                />

                <PrivateRoute
                  path="/organizations"
                  component={OrganizationListScreen}
                />
              </>
            )}

            <PrivateRoute path="/" component={HomeScreen} exact />
            <Route path="*" component={ErrorScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App
