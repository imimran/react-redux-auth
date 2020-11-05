import React, {  useEffect } from 'react'
import { Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listOrganization } from '../store/actions/organizationAction'


const OrganizationListScreen = () => {

  const dispatch = useDispatch();

  const listOfOrganization = useSelector((state) => state.listOfOrganization)
  const { loading, error, organizations  } = listOfOrganization
 

  useEffect(() =>{
    dispatch(listOrganization())
  }, [dispatch])

  return (
    <>
      <Link
        to="/organization/create"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Add Organization
      </Link>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Organization Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>User ID</th>
          </tr>
        </thead>
        {organizations && (
          <tbody>
            {organizations.length > 0 ? (
              organizations.map((organization) => (
                <tr key={organization.id}>
                  <td>{organization.id}</td>
                  <td>{organization.name}</td>
                  <td>{organization.email}</td>
                  <td>{organization.phone}</td>
                  <td>{organization.address}</td>
                  <td>{organization.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No Data Found</td>
              </tr>
            )}
          </tbody>
        )}
      </Table>
    </>
  );
}

export default OrganizationListScreen;
