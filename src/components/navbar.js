import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Button, Col} from 'react-bootstrap';
import {Form, FormControl} from 'react-bootstrap';
import logo from '../images/logo.png'
class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <Navbar bg="transparent" expand="lg">
            <Navbar.Brand href="#home">
            <img
              src={logo}
              width="25"
              height="25"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
      InvestBeta</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#home">Link 1</Nav.Link>
                <Nav.Link href="#link">Link 2</Nav.Link>
                <Nav.Link href="#link">Link 3</Nav.Link>
                <Nav.Link href="#link">Link 4</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default CustomNavbar;