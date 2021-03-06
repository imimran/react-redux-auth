import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../store/actions/userActions";
import { employeeLogout } from "../store/actions/employeeLoginAction";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { OrganizerSidebarData } from "./OrganizerSidebarData";
import { EmployeeSidebarData } from "./EmployeeSidebarData";
import { AdminSidebarData } from "./AdminSidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

   const employeeLogin = useSelector((state) => state.employeeLogin);
   const { employeeInfo } = employeeLogin;
   
  console.log(employeeInfo);


  const logoutHandler = () => {
    dispatch(logout());

  };

    const employeelogoutHandler = () => {
      dispatch(employeeLogout());
    };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <IconContext.Provider value={{ color: "#fff" }}>
            <Navbar.Collapse id="basic-navbar-nav">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </Navbar.Collapse>
            <Nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {employeeInfo &&
                  employeeInfo.results &&
                  employeeInfo.results.isValid &&
                  EmployeeSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}

                {userInfo &&
                  userInfo.results &&
                  userInfo.results.isEmployee &&
                  EmployeeSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}

                {userInfo &&
                  userInfo.results &&
                  userInfo.results.isOrganizer &&
                  OrganizerSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}

                {userInfo &&
                  userInfo.results &&
                  userInfo.results.isAdmin &&
                  AdminSidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </Nav>
          </IconContext.Provider>

          <LinkContainer to="/">
            <Navbar.Brand>Employee Management</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {employeeInfo ? (
                <NavDropdown title={employeeInfo.results.email} id="username">
                  <NavDropdown.Item onClick={employeelogoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/employee-login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Employee LogIn
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.results.email} id="username">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
