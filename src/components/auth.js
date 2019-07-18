import React, {Component} from 'react';
import {Button, Col, Row, Form, Alert} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { thisTypeAnnotation } from '@babel/types';
import { withRouter } from 'react-router-dom';

class AuthApp extends Component{

    constructor(props)
    {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.confirmPassword = this.confirmPassword.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.handleLogin = this.handleLogin.bind(this);

      this.state = {
          id: this.props.id, 
          data: {},
          email: '',
          password: '',
          confirmPassword: '',
          message: ''
        }
    }

    

    handleSignUp(event) {
        console.log("Form Submitted");
        var email = this.state.email;
        var password = this.state.password;
        if(this.state.confirmPassword != password)
        {
            this.setState({message:"Passwords do not match"})
        }
        else
        {
            axios.post('https://invest-beta.herokuapp.com/auth/register', {
                email: email,
                password: password,
              })
              .then((response) => {
                response = response.data
                if(!response.auth)
                {
                    console.log(response)
                    console.log("Could not create account")
                    this.setState({message: response.message});
                }
                else
                {
                    // let path = '/discover';
                    // this.props.history.push(path);
                    this.setState({id: 'login'})
                }

              })
              .catch(function (error) {
                console.log(error);
              });
        }

        event.preventDefault()

    }

    handleLogin(event) {
        console.log("Form Submitted");
        var email = this.state.email;
        var password = this.state.password;
        
        axios.post('https://invest-beta.herokuapp.com/auth/login', {
                email: email,
                password: password,
            })
            .then((response) => {
                response = response.data
                console.log(response)
                if(!response.auth)
                {
                    this.setState({message: response.message});
                }
                else
                {
                    localStorage.setItem('jwt-token', response.token);
                    console.log(localStorage.getItem('jwt-token'));
                    let path = '/account';
                    this.props.history.push(path);
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault()

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    confirmPassword(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value.length)
        if(value.length == 0)
        {
            this.setState({confirmPassword: value, message: ""})
        }
        else if(value != this.state.password)
        {
            this.setState({confirmPassword: value, message: "Passwords do not match"})
        }
        else
        {
            this.setState({confirmPassword: value, message: ""})
        }
    }

    render()
    {

        let login_form = 
        <Form className="col-12" id="auth-form" onSubmit={this.handleLogin}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label className="col-12">Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
        
            <Form.Group controlId="formBasicPassword">
            <Form.Label className="col-12">Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange} required/>
            </Form.Group>
            <Button className='custom-button col-6 offset-3' type="submit">
            Submit
            </Button>
            <p className='col-12'>Don't have an account yet? <a href='/auth/signup'>Sign up here</a></p>
        </Form>

        let signup_form = 
        <Form className="col-12" id="auth-form" onSubmit={this.handleSignUp}>
            <Form.Group controlId="formBasicEmail">
            <Form.Label className="col-12">Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                 required/>            
            <Form.Text className="text-muted col-12">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>
        
            <Form.Group controlId="formBasicPassword">
            <Form.Label className="col-12">Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange} required/>
            </Form.Group>            
            <Form.Group controlId="formBasicPassword">
            <Form.Label className="col-12">Confirm Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.confirmPassword} />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
            <Form.Check className='col-12' type="checkbox" label="I agree to the terms and conditions" />
            </Form.Group>
            <Button className='custom-button col-6 offset-3' type="submit">
            Submit
            </Button>
            <p className='col-12'>Already have an account? <a href='/auth/login'>Log in here</a></p>
        </Form>

        let message
        if(this.state.message.length>0)
        {
            message = <Alert className='col-10 offset-1' variant='warning'>
                        {this.state.message}                    
                    </Alert>
        }

        let return_value;
        
        switch(this.state.id)
        {
            case 'login':
                return_value = 
                <Row>
                    <h2 className="col-12">Log In</h2>
                    {message}
                    {login_form}
                </Row>
                break;
            case 'signup':
                return_value = 
                <Row>
                    <h2 className="col-12">Sign Up</h2>
                    {message}
                    {signup_form}
                </Row>
                break;
            default:
                return_value =
                <Row>
                    <h2 className="col-12">Log In</h2>
                    {message}
                    {login_form}
                </Row>
                break;
        }

      return return_value;
    }
  }

  export default withRouter(AuthApp);