import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
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
        <h2 className='col-10 offset-1 col-sm-5 offset-sm-1 col-md-10 offset-md-1'>The InvestBeta Advantage</h2>
        <Col xs={{span:'12'}} md={{span:10, offset:1}} className="row">
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} md={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>
          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '1'}} md={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>

          <Col xs={{span: '10', offset: '1'}} sm={{span: '5', offset: '0'}} md={{span: '4', offset: '0'}} className="wrapper">
            <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
          </Col>
        </Col>

      </div>
    )
  }
}

export default Advantage;