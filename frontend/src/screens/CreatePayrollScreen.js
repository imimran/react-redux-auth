import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createPayroll } from "../store/actions/payrollActions";
import Message from "../components/Message";

const CreatePayrollScreen = ({ location, history }) => {
  const [salary, setSalary] = useState("");

  const dispatch = useDispatch();

  const addPayroll = useSelector((state) => state.addPayroll);
  const { loading, error, payroll } = addPayroll;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPayroll(salary));
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

        <Button type="submit" variant="primary">
          Create Payroll
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreatePayrollScreen;
