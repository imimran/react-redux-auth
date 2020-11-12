import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "../store/actions/employeeActions";

import { Link } from "react-router-dom";

const EmployeeDetailsScreen = ({match}) => {
    
  const dispatch = useDispatch();



  const detailsEmployee = useSelector((state) => state.detailsEmployee);
  const { employee } = detailsEmployee;
  
  console.log(employee)

  useEffect(() => {
        
          dispatch(employeeDetails(match.params.id));   
          console.log(match.params);   
        
  }, [dispatch, match])

  return (
    <>
      <Container>
        <Card style={{ width: "18rem" }}>
          {employee && (
            <Card.Body>
              <Card.Title>Employee details</Card.Title>
              <Card.Text>ID: {employee.id} </Card.Text>
              <Card.Text>Name: {employee.name} </Card.Text>

              <Card.Text>Email: {employee.email} </Card.Text>
              <Card.Text>Degination: {employee.designation} </Card.Text>
              <Card.Text>Department: {employee.department} </Card.Text>
              <Card.Text>Organization ID: {employee.organizationId} </Card.Text>
            </Card.Body>
          )}
        </Card>
      </Container>
    </>
  );
};

export default EmployeeDetailsScreen;
