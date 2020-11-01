import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createAnnouncement } from "../store/actions/announcementActions";
import Message from "../components/Message";

const CreateAnouncementScreen = ({ location, history }) => {
  const [message, setMessage] = useState("");


  const dispatch = useDispatch();

  const addAnnouncement = useSelector((state) => state.addAnnouncement);
  const { loading, error, announcement } = addAnnouncement;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAnnouncement(message));
  };

  return (
    <FormContainer>
      <h1>Create Your Announcement</h1>
      {error && <Message variant="danger">{error}</Message>}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="message">
          <Form.Label> Announcement</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Button type="submit" variant="primary">
          Create Anouncement
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateAnouncementScreen;
