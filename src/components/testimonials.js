import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import testimonial_img from '../images/testimonial.png'

class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {

    return (
        <div className="row" id="testimonials">
            <h6 className="col-12 subtitle">You don't have to believe us.</h6>
            <h1 className="col-12">Hear it from our customers.</h1>
            <Col xs="12">
            <Row>
            <Col xs={{span: '12'}} sm={{span:'6'}} lg={{span:'5'}} className='img-wrapper row'>
              <img src={testimonial_img} alt=""></img>
            </Col>
            <Col xs={{span: '12'}} sm={{span:'6'}} lg={{span:'7'}} className='text'>
                <div class='container'>
                <h6 className="col-10 offset-1 col-sm-10 col-lg-8 col-xl-10">“InvestBeta gave me the platform to reach investors from around the world who have helped me grow my team and revenues. I have now opening my 10th store and regularly help other small businesses grow and succeed.”</h6>
                <p className="col-10 offset-1 col-sm-10 col-lg-8 col-xl-10 container">- <span>Shola Adekunlye</span>, First Business Cohort of InvestBeta</p>
                <a className="col-10 offset-1 col-sm-10 col-lg-8 col-xl-10" href="/">MORE STORIES <i className="fas fa-chevron-right"></i></a>
                </div>
            </Col>
            </Row>
            </Col>
        </div>
    )
  }
}

export default Testimonials;