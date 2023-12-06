import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Nav.css';

function NavBar() {
  return (
    <>
      <Navbar expand="lg">
        <Container>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/2.9.1/react-bootstrap.min.js" integrity="sha512-Kt3LTTN3UGh7i8WC2CKD+QDzphBjxpPfnD1k9/03mJkyJzPDxDJtQzHlVWmtdU064nuMQiSfLLhamDKyukwu1g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-light" as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link className="text-light" as={Link} to="/login">Acceder</Nav.Link>
              <Nav.Link className="text-light" as={Link} to="/proyectos">Proyectos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
