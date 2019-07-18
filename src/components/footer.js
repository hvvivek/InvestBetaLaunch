import React, {Component} from 'react';
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
            <div className="d-none d-lg-block col-lg-2 offset-lg-2 logo-img-wrapper">
                <img src={logo_2} alt=""></img>
            </div>

            <ul className="col-6 col-sm-3 offset-sm-0 col-lg-2 offset-lg-1 offset-xl-0">
                <li>Company</li>
                <li><a href="/discover">Discover</a></li>
                <li>Blog</li>
                <li>FAQ</li>
                <li>About Us</li>
            </ul>

            <ul className="col-6 col-sm-3 col-md-2">
                <li>Legal</li>
                <li>Privacy Policy</li>
                <li>Terms</li>
            </ul>

            <ul className="col-8 col-sm-4 col-md-3">
                <li>Connect</li>
                <li className="sm-links col-12">
                    <ul className="row">
                        <li className="col-2"><i className="fab fa-twitter"></i></li>
                        <li className="col-2"><i className="fab fa-facebook"></i></li>
                        <li className="col-2"><i className="fab fa-whatsapp"></i></li>
                        <li className="col-2"><i className="fab fa-instagram"></i></li>
                    </ul>
                </li>
                <li>info@investbeta.com</li>
                <li>617-218-7273</li>
            </ul>

            <div className="col-sm-2 offset-sm-1 d-block d-lg-none footer-logo">
                <img src={logo_1} alt=""></img>
            </div>

            
        </footer>
    )
  }
}

export default Footer;