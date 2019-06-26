import React, {Component} from 'react';
import CustomNavbar from './navbar';
import CustomButton from './button';
import {Button} from 'react-bootstrap';
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
        <h1 className='col-10 offset-1'>Invest in highly-vetted African SME's</h1>
        <ul className='col-10 offset-1'>
            <li>Significant Returns.</li>
            <li>Capital Guaranteed.</li>
            <li>Meaningful Impact.</li>
        </ul>
        <div className='row buttons'>
          <div className='col-6'>
            <CustomButton text='Entrepreneur' img='' />
          </div>
          <div className='col-6'>
            <CustomButton text='Investor' img='' />
          </div>
        </div>
        <Button className='customer-support-button'>
          <img src={intercom} alt="I"></img>
        </Button>
      </div>
    )
  }
}

export default HomePage;