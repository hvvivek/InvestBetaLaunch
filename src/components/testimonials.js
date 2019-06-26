import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Button, Col} from 'react-bootstrap';
import {Form, FormControl} from 'react-bootstrap';
import testimonial_img from '../images/testimonial.png'

class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {

    return (
        <div className="row" id="testimonials">
            <h6 className="col-12">You don't have to believe us.</h6>
            <h1 className="col-12">Hear it from our customers.</h1>
            <div className="col-12 img-wrapper">
              <img src={testimonial_img}></img>
            </div>
            <div className="text">
                <h6>“InvestBeta gave me the platform to reach investors from around the world who have helped me grow my team and revenues.”</h6>
                <p>- <span>Shola Adekunlye</span>, First Business Cohort of InvestBeta</p>
                <a href="">MORE STORIES <i class="fas fa-chevron-right"></i></a>
            </div>
        </div>
    )
  }
}

export default Testimonials;