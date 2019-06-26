import React, {Component} from 'react';
import CustomNavbar from './navbar';
import CustomButton from './button';
import {Button, Col} from 'react-bootstrap';
import intercom from '../images/intercom.png';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='container' id='home'>
        <CustomNavbar></CustomNavbar>
        <h1 className='col-10 offset-1 col-sm-6'>Invest in highly-vetted African SME's</h1>
        <ul className='col-10 offset-1 col-sm-6'>
            <li>Significant Returns.</li>
            <li>Capital Guaranteed.</li>
            <li>Meaningful Impact.</li>
        </ul>
        <Col xs={{span:'12'}} sm={{span:'6'}} className='row buttons'>
          <Col xs={{span:'6'}} sm={{span:'12'}}>
            <CustomButton text='Entrepreneur' img='' />
          </Col>
          <Col xs={{span:'6'}} sm={{span:'12'}}>
            <CustomButton text='Investor' img='' />
          </Col>
        </Col>
        <Button className='customer-support-button'>
          <img src={intercom} alt="I"></img>
        </Button>
      </div>
      
    )
  }
}

export default HomePage;