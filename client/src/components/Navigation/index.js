import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";

import Login from '../Login'
import Signup from '../Signup'

import Auth from "../../utils/auth";
function Navigation() {

  const [showModal, setShowModal] = useState(false);

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
              {/* if user is logged in show profile, log out and add a pet */}
              {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <p className="nav-items">Profile</p>
                </Nav.Link>
                
                <Nav.Link as={Link} to="/addpet">
                <p className="nav-items">Add a Pet</p>
                </Nav.Link>

                <Nav.Link onClick={Auth.logout}>
                <p className="logout">Logout</p>
                </Nav.Link>
              </>
              ) : (
              <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}

              <Nav.Link as={Link} to="/contact">
                <p className="nav-items">Contact</p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <Signup handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
}
export default Navigation;
