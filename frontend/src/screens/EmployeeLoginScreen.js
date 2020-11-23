import React, { useState, useEffect } from "react";
import FormContainer from '../components/FormContainer'
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../store/actions/employeeLoginAction'
import Message from "../components/Message";


const EmployeeLoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { error, employeeInfo } = employeeLogin;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/";

    useEffect(() => {
      if (employeeInfo) {
        history.push(redirect);
      }
    }, [history, employeeInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
 
  };


  return (
    <FormContainer>
      <h1>Employee SignIn</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

  
    </FormContainer>
  );
}

export default EmployeeLoginScreen
