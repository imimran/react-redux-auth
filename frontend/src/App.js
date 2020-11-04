import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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



const App = () => {
  //const token = localStorage.getItem("authToken") 
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
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
          <PrivateRoute path="/costs" component={CostListScreen} />

          <PrivateRoute
            path="/payroll/create"
            component={CreatePayrollScreen}
          />

          <PrivateRoute path="/payrolls" component={PayrollListScreen} />

          <PrivateRoute
            path="/attendence/create"
            component={CreateAttendenceScreen}
          />
          <PrivateRoute path="/attendences" component={AttendenceListScreen} />
          <PrivateRoute
            path="/employee/create"
            component={CreateEmployeeScreen}
          />
          <PrivateRoute path="/employees" component={EmployeeListScreen} />
          {/* <Route
            path="/organization/create"
            render={() => {
              if (!token) return <Redirect to="/login" />;
              return <OrganizationScreen />;
            }}
          /> */}

          <PrivateRoute
            path="/organization/create"
            component={OrganizationScreen}
          />
          <PrivateRoute
            path="/organizations"
            component={OrganizationListScreen}
          />
          <PrivateRoute path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App
