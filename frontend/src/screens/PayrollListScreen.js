import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { listPayroll } from "../store/actions/payrollActions";
import Moment from "react-moment";


const PayrollListScreen = () => {
  const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

  const listOfPayroll = useSelector((state) => state.listOfPayroll);
  const {  payrolls } = listOfPayroll;


  useEffect(() => {
    dispatch(listPayroll());

  }, [dispatch]);
  return (
    <>
      {userInfo && userInfo.results && userInfo.results.isOrganizer && (
        <Link
          to="/payroll/create"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Create Payslip
        </Link>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Total Pay</th>
            <th> Due Ammount</th>
            <th>Month</th>

            <th>Organization</th>
            <th>Employee</th>
          </tr>
        </thead>
        {payrolls && (
          <tbody>
            {payrolls.length > 0 ? (
              payrolls.map((payroll) => (
                <tr key={payroll.id}>
                  <td>{payroll.id}</td>

                  <td>{payroll.pay}</td>
                  <td>{payroll.due}</td>

                  <td>
                    {" "}
                    <Moment format="MMMM YYYY">{payroll.month}</Moment>
                  </td>

                  <td>{payroll.organization.name}</td>
                  <td>{payroll.employee.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No data found</td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default PayrollListScreen;
