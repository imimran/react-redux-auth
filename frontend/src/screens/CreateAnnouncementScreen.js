import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { createAnnouncement } from "../store/actions/announcementActions";
import Message from "../components/Message";
import { listOrganization } from "../store/actions/organizationAction";
import Select from "react-select";

const CreateAnouncementScreen = ({ location, history }) => {
  const [message, setMessage] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const dispatch = useDispatch();

  const addAnnouncement = useSelector((state) => state.addAnnouncement);
  const { error, announcement } = addAnnouncement;

   const listOfOrganization = useSelector((state) => state.listOfOrganization);
   const { organizations } = listOfOrganization;

   const redirect = location.search ? location.search.split("=")[1]: "/announcements"

   useEffect(()=>{
     if(announcement){
       history.push(redirect)
     }
     dispatch(listOrganization())
   }, [dispatch, history, redirect, announcement])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAnnouncement(message, organizationId));
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
      <h1>Create Your Announcement</h1>
      {error && <Message variant="danger">{error}</Message>}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="message">
          <Form.Label> Announcement</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label> Select Organization</Form.Label>
          {organizations && organizations.length > 0 && (
            <Select options={options} onChange={handleSelectChange} />
          )}
        </Form.Group>
        <Button type="submit" variant="primary">
          Create Anouncement
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateAnouncementScreen;
