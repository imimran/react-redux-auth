import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, listEmployee } from "../store/actions/employeeActions";
import { Link } from "react-router-dom";

import { listOrganization } from "../store/actions/organizationAction";

const EmployeeListScreen = () => {
  const dispatch = useDispatch();

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  const removeEmployee = useSelector((state) => state.removeEmployee);
  const { success } = removeEmployee;

  useEffect(() => {
    dispatch(listEmployee());
    dispatch(listOrganization());
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteEmployee(id));
    }
  };
  return (
    <>
      <Link
        to="/employee/create"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Add Employee
      </Link>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Organization</th>
            <th> Action</th>
          </tr>
        </thead>
        {employees && (
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>{employee.organization.name}</td>

                  <td>
                    <LinkContainer to={`/employee/${employee.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-user"></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/employee/edit/${employee.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(employee.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No data found</td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default EmployeeListScreen;
