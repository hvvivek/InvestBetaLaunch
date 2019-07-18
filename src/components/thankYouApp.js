import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, Form, FormControl, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Formik} from 'formik';

class ThankYouApp extends Component{

    constructor(props)
    {
        super(props);
        let message = ''
        let buttons = <div></div>
        switch(this.props.type)
        {
            case "business":
                message = 'Thank you for registering. We will now process your application. We will be in touch with you in 2-3 working days';
                buttons = <Col xs='12'>
                            <Button className='custom-button col-10 col-md-4 offset-1' onClick={() => this.props.history.push('/discover')}>Discover More</Button>
                            <Button className='custom-button col-10 col-md-4 offset-1' onClick={() => this.props.history.push('/')}>Home</Button>
                        </Col>
                break;
            case "investment":
                message = 'Your payment was successful! Please go to "My Account" for more details about your investment(s)';
                buttons = <Col xs='12'>
                            <Button className='custom-button col-10 col-md-4 offset-1' onClick={() => this.props.history.push('/discover')}>Discover More</Button>
                            <Button className='custom-button col-10 col-md-4 offset-1' onClick={() => this.props.history.push('/account')}>My Account</Button>
                        </Col>
                break;
            default:
                message = ''
                break;
        }
        this.state = {
            message: message,
            ref_id: this.props.ref_id,
            buttons: buttons
        }
    }
  
    componentDidMount()
    {
    }

    render()
    {

        let return_value = 
        <Row id="thank-you-app">
            <Col xs='12' lg={{span:'4', offset:'4'}}>
                <h3>Thank you</h3>
                <p>{this.state.message}</p>
                <p>Your reference ID is: {this.state.ref_id}.</p>
                <p>You can use this reference id if you need to contact customer support for quicker resolution.</p>
                {this.state.buttons}
            </Col>
        </Row>
        return (return_value);
    }
  }

  export default withRouter(ThankYouApp);