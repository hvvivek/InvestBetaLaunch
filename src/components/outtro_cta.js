import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import CustomButton from './button';

class Outtro extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {
    
    return (
        <div className="row" id="outtro">
            <Col xs={{span:'12'}} md={{span:'6', offset:'3'}}> 
              <Row>
              <Col xs={{span:'12'}} sm={{span:'7'}}>
                <h1>Interested?</h1>
                <h6>Start by choosing a path</h6>
              </Col>
              <Col xs={{span:'12'}} sm={{span:'5'}}>
                <Row>
                  <Col xs={{span:'6'}} sm={{span:'12'}}>
                    <CustomButton text='Entrepreneur' img='' />
                  </Col>
                  <Col xs={{span:'6'}} sm={{span:'12'}}>
                    <CustomButton text='Investor' img='' />
                  </Col>
                </Row>
              </Col>
              </Row>
            </Col>
            
        </div>
    )
  }
}

export default Outtro;