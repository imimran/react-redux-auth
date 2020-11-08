import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployee } from "../store/actions/employeeActions";
import { Link } from "react-router-dom";

import { listOrganization } from "../store/actions/organizationAction";

const EmployeeListScreen = () => {
  const dispatch = useDispatch();

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { employees } = listOfEmployee;

  const listOfOrganization = useSelector((state) => state.listOfOrganization);
  const { organizations } = listOfOrganization;

  useEffect(() => {
    dispatch(listEmployee());
    dispatch(listOrganization());
  }, [dispatch]);
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Organization Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {organizations && (
          <tbody>
            {organizations.length > 0 ? (
              organizations.map((organization) => (
                <tr key={organization.id}>
                  <td>{organization.id}</td>
                  <td>{organization.name}</td>
                  <td>
                    {" "}
                    <Link
                      to="/employee/create"
                      className="btn btn-primary"
                      style={{ marginBottom: 20 }}
                    >
                      Add Employee
                    </Link>
                  </td>
                  <td>
                    {" "}
                    <Link
                      to="/employee-list"
                      className="btn btn-primary"
                      style={{ marginBottom: 20 }}
                    >
                       Employee List
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Data Found</td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
      {/* <Link
        to="/employee/create"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Add Employee
      </Link> */}
      
    </>
  );
};

export default EmployeeListScreen;
