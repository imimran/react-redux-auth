import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createLeave } from "../store/actions/leavesActions";
import Message from "../components/Message";
import { listEmployee } from "../store/actions/employeeActions";
import { listOrganization } from "../store/actions/organizationAction";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

const CreateLeavesScreen = ({ location, history }) => {
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);
  const [leaveForDays, setLeaveForDays] = useState([today, tomorrow]);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const dispatch = useDispatch();

  const addLeave = useSelector((state) => state.addLeave);
  const { error, leave } = addLeave;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  const redirect = location.search ? location.search.spilt("=")[1] : "/leaves";

  useEffect(() => {
    if (leave) {
      history.push(redirect);
    }
    dispatch(listOrganization());
    dispatch(listEmployee());
  }, [dispatch, redirect, history, leave]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createLeave(leaveForDays, reason, status, organizationId, employeeId)
    );
  };

  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  const handleEmployeeChange = (e) => {
    setEmployeeId(e);
  };

  const handleStatusChange = (e) => {
    setStatus(e);
  };

  return (
    <FormContainer>
      <h1>Create Your Leaves</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="days">
          <Form.Label> Request for Days</Form.Label> <br></br>
          <DatePicker
            range
            className="red rmdp-mobile"
            placeholder="Click to select date"
            type="input-icon"
            style={{
              backgroundColor: "fff00f",
              height: "40px",
              width: "520px",
              borderRadius: "8px",
              fontSize: "14px",
              padding: "20px 20px",
            }}
          />
          {/* <Form.Control
            type="number"
            placeholder="Enter days"
            value={leaveForDays}
            onChange={(e) => setLeaveForDays(e.target.value)}
          ></Form.Control> */}
        </Form.Group>

        <Form.Group controlId="reason">
          <Form.Label>Reason</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Enter reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label> Status</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option>Select</option>
            <option>Approve</option>
            <option>Reject</option>
            <option>Pending</option>
          </Form.Control>
        </Form.Group>

        {organizations && organizations.length > 0 && (
          <Form.Group controlId="organizationId">
            <Form.Label> Select Organization</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleOrganizationChange(e.target.value)}
            >
              <option>Select Organization </option>
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
              <option>Select Employee</option>
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
