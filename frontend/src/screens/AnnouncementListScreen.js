import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAnnouncement } from "../store/actions/announcementActions";
import { Link } from 'react-router-dom'
import Moment from "react-moment";

const AnnouncementListScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const listOfAnnouncement = useSelector((state) => state.listOfAnnouncement);
  const { announcements } = listOfAnnouncement;
  

  useEffect(() => {
    dispatch(listAnnouncement());
  }, [dispatch]);
  return (
    <>
      {userInfo.results.isOrganizer && (
        <Link
          to="/announcement/create"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          Add announcement
        </Link>
      )}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Announcement</th>
            <th>Organization Name</th>
            <th>Time</th>
          </tr>
        </thead>
        {announcements && (
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>{announcement.id}</td>
                  <td>{announcement.message}</td>
                  <td>{announcement.organization.name}</td>
                  <td>
                    {" "}
                    <Moment format="MMMM Do YYYY, h:mm:ss a">
                      {announcement.createdAt}
                    </Moment>
                  </td>
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

export default AnnouncementListScreen;
