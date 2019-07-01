import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import AdvantageLink from './advantageLink';

let text = 'Africa is the latest frontier of entrepreneurship. The team behind InvestBeta understands the African landscape deeply and vets the most exciting businesses regularly.'

class Advantage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='row' id='advantage'>
        <Row className="d-block d-xl-none">
        <h2 className='col-10 offset-1 col-sm-5 offset-sm-1 col-lg-10 offset-lg-1'>The InvestBeta Advantage</h2>
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '3', offset: '1'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '1'}} lg={{span: '3', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>

          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '3', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>
          </Row>

          <Row className="d-none d-xl-block">
        <h2 className='col-10 offset-1 col-sm-5 offset-sm-1 col-lg-10 offset-lg-1'>The InvestBeta Advantage</h2>
        <Col xl={{span:'8', offset:'2'}} className="row">
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '1'}} lg={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>

          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>
          </Col>
          </Row>

      </div>
    )
  }
}

export default Advantage;