import React, {Component} from 'react';
import {Col, ProgressBar} from 'react-bootstrap';
import agribusiness_img from '../images/agribusiness.png'

const PLACEHOLDER_IMAGE = 'https://images.theconversation.com/files/210056/original/file-20180313-30961-1z04r7d.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'

class Opportunity extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text, img: this.props.img}
  }

  render() {
    return (
        <div className='opportunity'>
          <div className="row">
            <div className="col-12 business-img">
              <img src={PLACEHOLDER_IMAGE} alt=""></img>
            </div>

            <section className="section-1 col-12">
              <span className="col-12"><img className="business-type-image" src={agribusiness_img} alt=""></img> AGRIBUSINESS</span>
              <h4 className="col-12">Debo's Farm Machinery</h4>
              <p className="col-12">Lagos, Nigeria</p>
            </section>

            <section className="section-2 col-12">
              <p className="col-12">Unit Price</p>
              <h5 className="col-12">₦60,000</h5>
              <p className="col-12 returns">10% RETURN IN 6 MONTHS</p>
            </section>

            <section className="section-3 col-12">
              <p className="col-12">₦100,000 to go</p>
              {/* Progress Bar */}
              <Col xs='12'>
                <ProgressBar variant="info" now={60} />
              </Col>
              <p className="col-12 time-to-go">Ends in 5 days</p>
            </section>
          </div>
        </div>
    )
  }
}

export default Opportunity;