import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createCost } from "../store/actions/costActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";

const CreateCostScreen = ({ location, history }) => {
  const [staffSalary, setStaffSalary] = useState("");
  const [utilityBill, setUtilityBill] = useState("");
  const [officeRent, setOfficeRent] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const dispatch = useDispatch();

  const addCost = useSelector((state) => state.addCost);
  const {  error, cost } = addCost;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

   const redirect = location.search
     ? location.search.split("=")[1]
     : "/costs";

  useEffect(() => {
    if (cost) {
      history.push(redirect);
    }
    dispatch(listOrganization());
  }, [dispatch, history, redirect, cost]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCost(staffSalary, utilityBill, officeRent, organizationId));
  };

  const options = [];
  console.log("organizations", organizations);
  if (organizations) {
    organizations.map((organization) =>
      options.push({ value: organization.id, label: organization.name })
    );
  }

  const handleSelectChange = (options) => {
    console.log("handle", options);
    setOrganizationId(options.value);
  };

  return (
    <FormContainer>
      <h1>Create Your Cost</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="message">
          <Form.Label> staffSalary</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={staffSalary}
            onChange={(e) => setStaffSalary(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label> UtilityBill</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={utilityBill}
            onChange={(e) => setUtilityBill(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label> officeRent</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={officeRent}
            onChange={(e) => setOfficeRent(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label> Select Organization</Form.Label>
          {organizations && organizations.length > 0 && (
            <Select options={options} onChange={handleSelectChange} />
          )}
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Cost
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateCostScreen;
