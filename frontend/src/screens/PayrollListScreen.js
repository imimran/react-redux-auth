import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { listPayroll } from "../store/actions/payrollActions";


const PayrollListScreen = () => {
  const dispatch = useDispatch();

  const listOfPayroll = useSelector((state) => state.listOfPayroll);
  const { loading, error, payrolls } = listOfPayroll;

  


  useEffect(() => {
    dispatch(listPayroll());

  }, [dispatch]);
  return (
    <>
      <Link
        to="/payroll/create"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Add Payroll
      </Link>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Salary</th>
            <th>Organization</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        {payrolls && (
          <tbody>
            {payrolls.length > 0 ? (
              payrolls.map((payroll) => (
                <tr key={payroll.id}>
                  <td>{payroll.id}</td>

                  <td>{payroll.salary}</td>
                  <td>{payroll.organization.name}</td>
                  <td>{payroll.employeeId}</td>
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
};

export default PayrollListScreen;
