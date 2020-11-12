import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import {
  editEmployee,
  employeeDetails,
} from "../store/actions/employeeActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";
import { EMPLOYEE_UPDATE_RESET } from "../store/constants/employeeConstants";

const UpdateEmployeeScreen = ({ match, history }) => {
  const employeeId = match.params.id;
  console.log(match.params.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const dispatch = useDispatch();

  const updateEmployee = useSelector((state) => state.updateEmployee);
  const { success: successUpdate, error } = updateEmployee;

  const detailsEmployee = useSelector((state) => state.detailsEmployee);
  const { employee } = detailsEmployee;
  console.log(employee);
  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  useEffect(() => {
    dispatch(listOrganization());
    //dispatch(employeeDetails(employeeId));
    console.log(employeeId);
    if (successUpdate) {
      dispatch({ type: EMPLOYEE_UPDATE_RESET });
      history.push("/employees");

    
    } else {
      
      if (employee.id !== employeeId) {
        dispatch(employeeDetails(employeeId));
      
      } else {
        setName(employee.name);
        setEmail(employee.email);
        setDesignation(employee.designation);
        setDepartment(employee.department);
        setOrganizationId(employee.organizationId);
      }
    }
  }, [dispatch, successUpdate, employeeId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editEmployee({
        id: employeeId,
        name,
        email,
        designation,
        department,
        organizationId,
      })
    );
  };

  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  return (
    <FormContainer>
      <h1>Edit Employee</h1>

      {error && <Message variant="danger">{error}</Message>}
     
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

        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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

        <Button type="submit" variant="primary">
          Update Employee
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateEmployeeScreen;
