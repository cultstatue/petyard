import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
function Navigation() {
  return (
    <>
      <Navbar className="nav-head">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <h1>Petyard</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {/* if user is logged in show order hsitory and logout */}
              {/* {Auth.loggedIn() ? ( */}
              <>
                <Nav.Link as={Link} to="/profile">
                  <p className="nav-items">Profile</p>
                </Nav.Link>
                {/* <Nav.Link onClick={Auth.logout}> */}
                {/* <p className="logout">Logout</p> */}
                {/* </Nav.Link> */}
              </>
              {/* ) : ( */}
              <Nav.Link as={Link} to="/login">
                <p className="nav-items">Login/Sign Up</p>
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                <p className="nav-items">Contact</p>
              </Nav.Link>
              {/* )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
    </>
  );
}
export default Navigation;
