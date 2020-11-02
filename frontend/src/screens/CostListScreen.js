import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCost } from "../store/actions/costActions";

const CostListScreen = () => {
  const dispatch = useDispatch();

  const listOfCost = useSelector((state) => state.listOfCost);
  const { loading, error, costs } = listOfCost;

  useEffect(() => {
    dispatch(listCost());
  }, [dispatch]);
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Staf Salary</th>
            <th>Utility Bill</th>
            <th>Office Rent</th>
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
