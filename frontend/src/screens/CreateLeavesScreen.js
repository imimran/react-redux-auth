import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createLeave } from "../store/actions/leavesActions";
import Message from "../components/Message";
import { listEmployee } from "../store/actions/employeeActions";
import { listOrganization } from "../store/actions/organizationAction";

const CreateLeavesScreen = ({ location, history }) => {
  const [leaveForDays, setLeaveForDays] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [organizationId, setOrganizationId] = useState("");


  const dispatch = useDispatch();

  const addLeave = useSelector((state) => state.addLeave);
  const {  error, leave } = addLeave;

    const listOfOrganization = useSelector((state) => state.listOfOrganization);
    const { organizations } = listOfOrganization;

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  const redirect = location.search
    ? location.search.spilt("=")[1]
    : "/leaves";


  useEffect(() => {
      if (leave) {
        history.push(redirect);
      }
    dispatch(listOrganization());
    dispatch(listEmployee());
  }, [dispatch, redirect, history, leave]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createLeave(leaveForDays, organizationId, employeeId));
  };

    const handleOrganizationChange = (e) => {
      setOrganizationId(e);
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

        {organizations && organizations.length > 0 && (
          <Form.Group controlId="organizationId">
            <Form.Label> Select Organization</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleOrganizationChange(e.target.value)}
            >
              {organizations.map((organization, index) => (
                <option value={organization.id} key={index}>
                  {organization.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

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
