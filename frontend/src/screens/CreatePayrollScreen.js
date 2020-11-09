import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createPayroll } from "../store/actions/payrollActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";
import { listEmployee } from "../store/actions/employeeActions";

const CreatePayrollScreen = ({ location, history }) => {
  const [salary, setSalary] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();

  const addPayroll = useSelector((state) => state.addPayroll);
  const { loading, error, payroll } = addPayroll;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  useEffect(() => {
    dispatch(listOrganization());
    dispatch(listEmployee());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPayroll(salary, organizationId, employeeId));
  };

  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  const handleEmployeeChange = (e) => {
    setEmployeeId(e);
  };
  return (
    <FormContainer>
      <h1>Create Your Payroll</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="salary">
          <Form.Label> Payroll</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {employees && (
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

        <Button type="submit" variant="primary">
          Create Payroll
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePayrollScreen;
