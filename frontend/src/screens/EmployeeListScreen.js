import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployee } from "../store/actions/employeeActions";

const EmployeeListScreen = () => {
    
  const dispatch = useDispatch();

  const listOfEmployee = useSelector((state) => state.listOfEmployee);
  const { loading, error, employees } = listOfEmployee;
  console.log(employees);

  useEffect(() => {
    dispatch(listEmployee());
  }, [dispatch]);
    return (
      <>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Department</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No data found</td>
                </tr>
              )}
            </tbody>
          )}
        </Table>
      </>
    );
}
 
export default EmployeeListScreen;
