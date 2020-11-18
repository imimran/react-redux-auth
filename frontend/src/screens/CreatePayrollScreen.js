import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createPayroll } from "../store/actions/payrollActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";
import { listEmployee } from "../store/actions/employeeActions";

const CreatePayrollScreen = ({ location, history }) => {
  const [pay, setPay] = useState("");
  const [due, setDue] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const dispatch = useDispatch();

  const addPayroll = useSelector((state) => state.addPayroll);
  const {  error, payroll } = addPayroll;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  const redirect = location.search
    ? location.search.spilt("=")[1]
    : "/payrolls";

  useEffect(() => {
    if (payroll) {
      history.push(redirect);
    }
    dispatch(listOrganization());
    dispatch(listEmployee());
  }, [dispatch, redirect, history, payroll]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPayroll(pay, due, month, year, employeeId, organizationId));
  };

  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  const handleEmployeeChange = (e) => {
    setEmployeeId(e);
  };
  return (
    <FormContainer>
      <h1>Create Payslip</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="pay">
          <Form.Label> Pay Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter pay amount"
            value={pay}
            onChange={(e) => setPay(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="due">
          <Form.Label> Due Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter due amount"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="month">
          <Form.Label> Month</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label> Payroll</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {employees && (
          <Form.Group controlId="employeeId">
            <Form.Label> Select Employee</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleEmployeeChange(e.target.value)}
            >
              <option> Select Employee</option>
              {employees.map((employee, index) => (
                <option value={employee.id} key={index}>
                  {employee.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        {organizations && organizations.length > 0 && (
          <Form.Group controlId="organizationId">
            <Form.Label> Select Organization</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleOrganizationChange(e.target.value)}
            >
              <option> Select Organization</option>
              {organizations.map((organization, index) => (
                <option value={organization.id} key={index}>
                  {organization.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

        <Button type="submit" variant="primary">
          Create Payroll
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePayrollScreen;
