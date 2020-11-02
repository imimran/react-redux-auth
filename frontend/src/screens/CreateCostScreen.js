import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createCost } from "../store/actions/costActions";
import Message from "../components/Message";

const CreateCostScreen = ({ location, history }) => {
  const [staffSalary, setStaffSalary] = useState("");
  const [utilityBill, setUtilityBill] = useState("");
  const [officeRent, setOfficeRent] = useState("");

  const dispatch = useDispatch();

  const addCost = useSelector((state) => state.addCost);
  const { loading, error, cost } = addCost;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCost(staffSalary, utilityBill, officeRent));
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

        <Button type="submit" variant="primary">
          Create Cost
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateCostScreen;
