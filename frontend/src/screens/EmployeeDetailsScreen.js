import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "../store/actions/employeeActions";
import { Link } from "react-router-dom";

const EmployeeDetailsScreen = ({match}) => {
    
  const dispatch = useDispatch();

  const detailsEmployee = useSelector((state) => state.detailsEmployee);
  const { loading, error, employee } = detailsEmployee;
  

  useEffect(() => {
        
          dispatch(employeeDetails(match.params.id));   
          console.log(match.params);   
        
  }, [dispatch, match])

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Employee details</Card.Title>
  <Card.Text>Name {employee.name}</Card.Text>
          <Card.Text>Email</Card.Text>
          <Card.Text>Degination</Card.Text>
          <Card.Text>Department</Card.Text>
        </Card.Body>
      </Card>
      ;
    </>
  );
};

export default EmployeeDetailsScreen;
