import React, { useEffect } from "react";
import { Tabs, Container, Tab, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "../store/actions/employeeActions";

const EmployeeDetailsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const detailsEmployee = useSelector((state) => state.detailsEmployee);
  const { employee } = detailsEmployee;

  console.log(employee);

  useEffect(() => {
    dispatch(employeeDetails(match.params.id));
    console.log(match.params);
  }, [dispatch, match]);

  return (
    <>
      <Container style={{ float: "left", padding: "60px" }}>
        <Row>
          <Col>
            <Card style={{ width: "70%" }}>
              {employee && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:4000/uploads/${employee.image}`}
                />
              )}
            </Card>
          </Col>

          <Col>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="profile" title="Profile">
                <Card style={{ width: "25rem%" }}>
                  {employee && (
                    <Card.Body>
                      <Card.Title>Profile</Card.Title>

                      <Card.Text>ID: {employee.id} </Card.Text>
                      <Card.Text>Name: {employee.name} </Card.Text>

                      <Card.Text>Email: {employee.email} </Card.Text>
                      <Card.Text>Phone: {employee.phone} </Card.Text>
                      <Card.Text>Address: {employee.address} </Card.Text>
                      <Card.Text>Total Salary: {employee.salary} </Card.Text>
                      <Card.Text>Degination: {employee.designation} </Card.Text>
                      <Card.Text>Department: {employee.department} </Card.Text>
                      <Card.Text>
                        Organization : {employee.organization.name}
                      </Card.Text>
                    </Card.Body>
                  )}
                </Card>
              </Tab>
              <Tab eventKey="employee-info" title="Employee Info">
                <Card style={{ width: "25rem" }}>
                  {employee && (
                    <Card.Body>
                      <Card.Title>Employee details</Card.Title>
                      <Card.Text>Total Salary: {employee.salary} </Card.Text>
                      <Card.Text>Degination: {employee.designation} </Card.Text>
                      <Card.Text>Department: {employee.department} </Card.Text>
                      <Card.Text>
                        Organization : {employee.organization.name}
                      </Card.Text>
                    </Card.Body>
                  )}
                </Card>
              </Tab>

              <Tab eventKey="document" title="Document" disabled></Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EmployeeDetailsScreen;
