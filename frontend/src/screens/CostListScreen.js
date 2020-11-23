import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCost } from "../store/actions/costActions";
import {Link} from 'react-router-dom'

const CostListScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listOfCost = useSelector((state) => state.listOfCost);
  const { costs } = listOfCost;

  useEffect(() => {
    dispatch(listCost());
  }, [dispatch]);
  return (
    <>
      {userInfo && userInfo.results && userInfo.results.isOrganizer && (
        <Link
          to="/cost/create"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Add Cost
        </Link>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Staf Salary</th>
            <th>Utility Bill</th>
            <th>Office Rent</th>
            <th>Organization</th>
          </tr>
        </thead>
        {costs && (
          <tbody>
            {costs.length > 0 ? (
              costs.map((cost) => (
                <tr key={cost.id}>
                  <td>{cost.id}</td>
                  <td>{cost.staffSalary}</td>
                  <td>{cost.utilityBill}</td>
                  <td>{cost.officeRent}</td>
                  <td>{cost.organization.name}</td>
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

export default CostListScreen;
