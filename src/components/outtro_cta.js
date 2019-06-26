import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import CustomButton from './button';

class Outtro extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {
    
    return (
        <div className="row" id="outtro">
          <div className="col-12">
            <h1>Interested?</h1>
            <h6>Start by choosing a path</h6>
            <Row>
              <div className="col-6">
                <CustomButton text='Entrepreneur' img='' />
              </div>
              <div className="col-6">
                <CustomButton text='Investor' img='' />
              </div>
            </Row>
            </div>
        </div>
    )
  }
}

export default Outtro;