import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createAttendence } from "../store/actions/attendenceActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";
import { listEmployee } from "../store/actions/employeeActions";

const CreateAttendenceScreen = ({ location, history }) => {
  const [month, setMonth] = useState("");
  const [leaves, setLeaves] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();

  const addAttendence = useSelector((state) => state.addAttendence);
  const { loading, error, attendence } = addAttendence;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/attendences";

  useEffect(() => {
    if (attendence) {
      history.push(redirect);
    }
    dispatch(listOrganization());
    dispatch(listEmployee());
  }, [dispatch, history, redirect, attendence]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAttendence(month, leaves, employeeId, organizationId));
  };

  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  const handleEmployeeChange = (e) => {
    setEmployeeId(e);
  };

  return (
    <FormContainer>
      <h1>Create Your Attendence</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="month">
          <Form.Label> Attendence</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      showTwoColumnMonthYearPicker
    />
  );
}; */}
        <Form.Group controlId="leaves">
          <Form.Label> Leaves</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter leaves"
            value={leaves}
            onChange={(e) => setLeaves(e.target.value)}
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
          Create Attendence
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateAttendenceScreen;
