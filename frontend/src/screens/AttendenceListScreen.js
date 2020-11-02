import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAttendence } from "../store/actions/attendenceActions";

const AttendenceListScreen = () => {

const dispatch = useDispatch()

const listOfAttendence = useSelector((state) => state.listOfAttendence);
const { loading, error, attendences} = listOfAttendence

useEffect(() =>{
    dispatch(listAttendence())
}, [dispatch])

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Month</th>
            <th>Days of Leave</th>
          </tr>
        </thead>
        {attendences && (
          <tbody>
            {attendences.length > 0 ? (
              attendences.map((attendence) => (
                <tr key={attendence.id}>
                  <td>{attendence.id}</td>
                  <td>{attendence.month}</td>
                  <td>{attendence.leaves}</td>
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
