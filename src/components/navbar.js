import React, {Component} from 'react';
import {Navbar, Nav, Button, Row} from 'react-bootstrap';
import logo from '../images/logo.png'
class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <Navbar bg="transparent" expand="lg" className="col-12" id="navbar">
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
            <Nav className='col-lg-4'>
              {/* <Row> */}
              <Button variant="outline-primary" className='col-8 offset-1 col-md-5 col-lg-5 offset-lg-1 custom-button custom-button-inverse'>Log In</Button>              
              <Button variant="outline-primary" className='col-8 offset-1 col-md-5 col-lg-5 offset-lg-1 custom-button'>Sign Up</Button>
              {/* </Row> */}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default CustomNavbar;