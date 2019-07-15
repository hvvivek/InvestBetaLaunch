import React, {Component} from 'react';
import {Navbar, Nav, Button, Row, Col} from 'react-bootstrap';
import logo from '../images/logo.png'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this)
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.state = {loggedIn: false, user_data: {}}
  }

  componentDidMount()
  {
    this.checkLogin()
  }

  handleLogin()
  {
    let path = '/auth/login';
    this.props.history.push(path);
  }

  handleLogout()
  {
    localStorage.removeItem('jwt-token');
    this.setState({loggedIn: false})
    let path = '/';
    this.props.history.push(path);
  }

  handleSignup()
  {
    let path = '/auth/signup';
    this.props.history.push(path);
  }

  handleAccount()
  {
    let path = '/account';
    this.props.history.push(path);
  }

  checkLogin()
  {
    console.log("Checking Login")
    var accessToken = localStorage.getItem('jwt-token');
    console.log(accessToken)
    if(accessToken)
    {
      console.log("Access Token exists")

      if(accessToken.length > 0)
      {
        console.log("Getting info from access token")
        let accessToken = localStorage.getItem('jwt-token');
        console.log(accessToken)
        axios.get('https://invest-beta.herokuapp.com/auth/jwt',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
              console.log(res)
                this.setState({loggedIn: res.data.auth, user_data: res.data})
            }
        )
        .catch(function (error) {
            console.log("Error")
            console.log(error);
        })
        .finally(function () {
            console.log("Finished downloading data")
        });
      }
      else{
        this.setState({loggedIn: false})
      }
    }
    else{
      this.setState({loggedIn: false})
    }
  }

  render() {

    var user_actions
    if(this.state.loggedIn)
    {
      user_actions = 
      <Row>
        <Button onClick={this.handleLogout} className='custom-button custom-button-inverse'>Log Out</Button> <br className="d-block d-lg-none"></br>             
        <Button onClick={this.handleAccount} className='custom-button'>My Account</Button>

      </Row>
    }
    else
    {
      user_actions = 
      <Row>
        <Button onClick={this.handleLogin} className='custom-button custom-button-inverse'>Log In</Button>   <br className="d-block d-lg-none"></br>
        <Button onClick={this.handleSignup} className='custom-button'>Sign Up</Button>
      </Row>
    }

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
            <Nav className='user-section'>
              {user_actions}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default withRouter(CustomNavbar);