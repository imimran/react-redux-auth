import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createAttendence } from "../store/actions/attendenceActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";
import { listEmployee } from "../store/actions/employeeActions";

const CreateAttendenceScreen = ({ location, history }) => {
  const [day, setDay] = useState("");
  const [status, setStatus] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const dispatch = useDispatch();

  const addAttendence = useSelector((state) => state.addAttendence);
  const { error, attendence } = addAttendence;

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
    dispatch(createAttendence(day, status, employeeId, organizationId));
  };

  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  const handleEmployeeChange = (e) => {
    setEmployeeId(e);
  };

  const handleStatusChange = (e) =>{
    setStatus(e)
  }

  return (
    <FormContainer>
      <h1>Add Attendence</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="day">
          <Form.Label> Attendence</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
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
        <Form.Group controlId="status">
          <Form.Label> status</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option>Select</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Leave</option>
          </Form.Control>
        </Form.Group>

        {employees && employees.length > 0 && (
          <Form.Group controlId="employeeId">
            <Form.Label> Select Employee</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleEmployeeChange(e.target.value)}
            >
              <option>Select Employee</option>
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
              <option>Select Organization</option>
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
