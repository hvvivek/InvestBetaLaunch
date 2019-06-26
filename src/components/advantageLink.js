import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Button, Col} from 'react-bootstrap';
import {Form, FormControl} from 'react-bootstrap';

class AdvantageLink extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {
    return (
        <div className='advantage'>
            <h3 className='col-8'>{this.state.title}</h3>
            <p className='col-12'>{this.state.text}</p>
            <a className='col-12' href=''>{this.state.link} ></a>
        </div>
    )
  }
}

export default AdvantageLink;