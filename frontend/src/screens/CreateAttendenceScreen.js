import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createAttendence } from "../store/actions/attendenceActions";
import Message from "../components/Message";

const CreateAttendenceScreen = ({ location, history }) => {
  const [month, setMonth] = useState("");
   const [leaves, setLeaves] = useState("");

  const dispatch = useDispatch();

  const addAttendence = useSelector((state) => state.addAttendence);
  const { loading, error, attendence } = addAttendence;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAttendence(month, leaves));
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

        <Form.Group controlId="leaves">
          <Form.Label> Leaves</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter leaves"
            value={leaves}
            onChange={(e) => setLeaves(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Attendence
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateAttendenceScreen;
