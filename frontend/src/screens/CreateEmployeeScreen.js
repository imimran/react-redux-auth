import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createEmployee } from "../store/actions/employeeActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";

const CreateEmployeeScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const addEmployee = useSelector((state) => state.addEmployee);
  const { error, employee } = addEmployee;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/employees";

  useEffect(() => {
    if (employee) {
      history.push(redirect);
    }
    dispatch(listOrganization());
  }, [dispatch, history, employee, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(image)
    dispatch(
      createEmployee(name, email, designation, department, organizationId, image)
    );
  };
  const handleOrganizationChange = (e) => {
    setOrganizationId(e);
  };

  const onFileChange = (e) => {
    console.log(e)
    setImage(e);
    
  };

  return (
    <FormContainer>
      <h1>Create Your Employee</h1>

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
       
        <Form.Group controlId="image">
          <Form.Label> Image</Form.Label>
          <Form.File
            id="exampleFormControlFile1"
            onChange={(e) => onFileChange(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Emoloyee
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateEmployeeScreen;
