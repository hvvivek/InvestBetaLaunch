import React, {Component} from 'react';
import CustomNavbar from './navbar';
import CustomButton from './button';
import {Button, Col, Row} from 'react-bootstrap';
import intercom from '../images/intercom.png';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = {}
  }

  handleRedirect(path)
  {
    this.props.history.push(path)
  }

  render() {
    return (
      <div className='container' id='home'>
        <Row>
        <CustomNavbar></CustomNavbar>
        <h1 className='col-10 offset-1 col-sm-8 offset-sm-0 col-lg-6 offset-sm-0'>Invest in highly-vetted African SME's</h1>
        <ul className='col-10 offset-1 col-sm-8 offset-sm-0'>
            <li>Significant Returns.</li>
            <li>Capital Guaranteed.</li>
            <li>Meaningful Impact.</li>
        </ul>
        <Col xs={{span:'12'}} sm={{span:'5', offset:'0'}} lg={{span:'8', offset:'0'}}  xl={{span:'5'}} className='buttons'>
          <Row>
          <Col xs={{span:'6'}} sm={{span:'12'}} lg={{span:'5'}} xl={{span:'10'}} onClick={() => this.handleRedirect('/auth/signup')}>
            <CustomButton text='Investor' img='' />
          </Col>
          <Col xs={{span:'6'}} sm={{span:'12'}} lg={{span:'5', offset:'1'}} xl={{span:'10', offset: '0'}} onClick={() => this.handleRedirect('/register')}>
            <CustomButton text='Entrepreneur' img=''  />
          </Col>
          </Row>
        </Col>
        <Button className='customer-support-button'>
          <img src={intercom} alt="I"></img>
        </Button>
        </Row>
      </div>
      
    )
  }
}

export default withRouter(HomePage);