import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createLeave } from "../store/actions/leavesActions";
import Message from "../components/Message";
import { listEmployee } from "../store/actions/employeeActions";

const CreateLeavesScreen = ({ location, history }) => {
  const [leaveForDays, setLeaveForDays] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();

  const addLeave = useSelector((state) => state.addLeave);
  const { loading, error, leave } = addLeave;

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  useEffect(() => {
    dispatch(listEmployee());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createLeave(leaveForDays, employeeId));
  };

  const handleEmployeeChange = (e) => {
    setEmployeeId(e);
  };

  return (
    <FormContainer>
      <h1>Create Your Leaves</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label> Request for Days</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={leaveForDays}
            onChange={(e) => setLeaveForDays(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {employees && employees.length > 0 && (
          <Form.Group controlId="employeeId">
            <Form.Label> Select Employee</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleEmployeeChange(e.target.value)}
            >
              {employees.map((employee, index) => (
                <option value={employee.id} key={index}>
                  {employee.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        <Button type="submit" variant="primary">
          Create Leave Request
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateLeavesScreen;
