import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import placeholder_img from '../images/placeholder_img.png'

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text, img: this.props.img}
  }

  render() {
    return (
        <Button className='custom-button col-12'>
          <div className='row'>
            <div className='col-3 image-wrapper'>
              <img src={placeholder_img} alt=""></img>
            </div>
            <div className='col-9'>
              <p>I am an</p>
              <p>{this.state.text}</p>
            </div> 
          </div>
          
          
        </Button>
    )
  }
}

export default CustomButton;