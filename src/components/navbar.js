import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../images/logo.png'
class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <Navbar bg="transparent" expand="lg" className="col-12">
            <Navbar.Brand href="/">
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
                <Nav.Link href="#home">Discover</Nav.Link>
                <Nav.Link href="#link">Blog</Nav.Link>
                <Nav.Link href="#link">Help</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default CustomNavbar;