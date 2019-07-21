import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import CustomButton from './button';
import investor from "../images/icon_investor.svg"
import entrepreneur from "../images/icon_entrepreneur.svg"

class Outtro extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {
    
    return (
        <div className="container" id="outtro">
            <Col xs={{span:'12'}} md={{span:'10', offset:'1'}} lg={{span:'8', offset:'2'}} className="wrapper"> 
            <Col xs={{span:'12'}}>
              <Row>
              <Col xs={{span:'12'}} sm={{span:'7'}} lg={{span:'6', offset:'0'}}>
                <h1>Interested?</h1>
                <h6>Start by choosing a path</h6>
              </Col>
              <Col xs={{span:'12'}} sm={{span:'5'}} lg={{span:'6'}}>
                <Row>
                  <Col xs={{span:'6'}} sm={{span:'12'}}>
                    <CustomButton text='Investor' img={investor} />
                  </Col>
                  <Col xs={{span:'6'}} sm={{span:'12'}}>
                    <CustomButton text='Entrepreneur' img={entrepreneur} />
                  </Col>
                </Row>
              </Col>
              </Row>
              </Col>

            </Col>
            
        </div>
    )
  }
}

export default Outtro;