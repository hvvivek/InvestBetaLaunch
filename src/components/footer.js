import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Button, Col} from 'react-bootstrap';
import {Form, FormControl} from 'react-bootstrap';
import logo_1 from '../images/logo_1.png';
import logo_2 from '../images/logo_2.png';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {
    return (
        <footer className="row">
            <ul className="col-6">
                <li>Company</li>
                <li>Discover</li>
                <li>Blog</li>
                <li>FAQ</li>
                <li>About Us</li>
            </ul>

            <ul className="col-6">
                <li>Legal</li>
                <li>Privacy Policy</li>
                <li>Terms</li>
            </ul>

            <ul className="col-8">
                <li>Connect</li>
                <li className="sm-links col-12">
                    <ul className="row">
                        <li className="col-2"><i class="fab fa-twitter"></i></li>
                        <li className="col-2"><i class="fab fa-facebook"></i></li>
                        <li className="col-2"><i class="fab fa-whatsapp"></i></li>
                        <li className="col-2"><i class="fab fa-instagram"></i></li>
                    </ul>
                </li>
                <li>info@investbeta.com</li>
                <li>617-218-7273</li>
            </ul>

            <div className="d-block d-sm-none footer-logo">
                <img src={logo_1}></img>
            </div>

            <div className="d-none">
                <img src={logo_2}></img>
            </div>
        </footer>
    )
  }
}

export default Footer;