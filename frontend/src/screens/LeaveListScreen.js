import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { listLeave } from "../store/actions/leavesActions";

const LeaveListScreen = () => {
  const dispatch = useDispatch();

  const listOfLeave = useSelector((state) => state.listOfLeave);
  const { loading, error, leaves } = listOfLeave;

  useEffect(() => {
    dispatch(listLeave());
  }, [dispatch]);
  return (
    <>
      <Link
        to="/leave/create"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Add Leave Request
      </Link>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Leave Requeat</th>
            <th>Organization</th>
            <th>Employee </th>
          </tr>
        </thead>
        {leaves && (
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.id}</td>

                  <td>{leave.leaveForDays}</td>
                  <td>{leave.organization.name}</td>
                  <td>{leave.employee.name}</td>
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

export default LeaveListScreen;
