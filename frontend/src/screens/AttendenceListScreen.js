import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAttendence } from "../store/actions/attendenceActions";
import { Link } from "react-router-dom";

const AttendenceListScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listOfAttendence = useSelector((state) => state.listOfAttendence);
  const { loading, error, attendences } = listOfAttendence;

  useEffect(() => {
    dispatch(listAttendence());
  }, [dispatch]);

  return (
    <>
      {userInfo.results.isOrganizer && (
        <Link
          to="/attendence/create"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Add attendence
        </Link>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Organization</th>
            <th>Employee </th>
          </tr>
        </thead>
        {attendences && (
          <tbody>
            {attendences.length > 0 ? (
              attendences.map((attendence) => (
                <tr key={attendence.id}>
                  <td>{attendence.id}</td>
                  <td>{attendence.day}</td>
                  <td>{attendence.status}</td>
                  <td>{attendence.organization.name}</td>
                  <td>{attendence.employee.name}</td>
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

export default AttendenceListScreen;
