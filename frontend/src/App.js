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


const App = () => {
  //const token = localStorage.getItem("authToken") 
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
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
