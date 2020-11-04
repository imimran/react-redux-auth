import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createEmployee } from "../store/actions/employeeActions";
import Message from "../components/Message";

const CreateEmployeeScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();

  const addEmployee = useSelector((state) => state.addEmployee);
  const { loading, error, employee } = addEmployee;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createEmployee(name, email, designation, department));
  };

  return (
    <FormContainer>
      <h1>Create Your Employee</h1>
      {error && <Message variant="danger">{error}</Message>}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label> Employee Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="department"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Organization
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateEmployeeScreen;
