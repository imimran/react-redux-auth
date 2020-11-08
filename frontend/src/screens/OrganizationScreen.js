import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { createOrganization } from '../store/actions/organizationAction'
import Message from "../components/Message";

const OrganizationScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const addOrganization = useSelector((state) => state.addOrganization)
  const { loading, error, organization } = addOrganization

    const redirect = location.search ? location.search.split("=")[1] : "/organizations";

      useEffect(() => {
        if (organization) {
          history.push(redirect);
        }
      }, [history, organization, redirect]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createOrganization(name, email, phone, address));
    
  };

  return (
    <FormContainer>
      <h1>Create Your Organization</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {/* {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
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

        <Form.Group controlId="password">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Create Organization
        </Button>
      </Form>
    </FormContainer>
  );
}

export default OrganizationScreen;
