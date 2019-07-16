import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import AdvantageLink from './advantageLink';

let text_1 = 'No matter your income level, there’s an opportunity for you to invest. Units are prized at accessible levels to enable everyone participate.'
let text_2 = "Bankable investment opportunities are difficult to come by in Africa. We leverage our network and relationships on the ground to bring you the best opportunities out there.";
let text_3="It’s on us! Your invested capital is fully guaranteed so you cannot lose your money. Just invest, relax and expect your money back in your account by due date."
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
            <AdvantageLink title='Unlimited Opportunities' text={text_2} link='Discover'></AdvantageLink>
          </Col>
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '1'}} lg={{span: '3', offset: '0'}} className="wrapper">
            <AdvantageLink title='Zero Stress, Zero Loss' text={text_3} link='Discover'></AdvantageLink>
          </Col>

          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '3', offset: '0'}} className="wrapper">
            <AdvantageLink title='Minimum Amounts' text={text_1} link='Discover'></AdvantageLink>
          </Col>
          </Row>

          <Row className="d-none d-xl-block">
        <h2 className='col-10 offset-1 col-sm-5 offset-sm-1 col-lg-10 offset-lg-1'>The InvestBeta Advantage</h2>
        <Col xl={{span:'8', offset:'2'}} className="row">
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Unlimited Opportunities' text={text_2} link='Discover'></AdvantageLink>
          </Col>
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '1'}} lg={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Zero Stress, Zero Loss' text={text_3} link='Discover'></AdvantageLink>
          </Col>

          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} lg={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Minimum Amounts' text={text_1} link='Discover'></AdvantageLink>
          </Col>
          </Col>
          </Row>

      </div>
    )
  }
}

export default Advantage;