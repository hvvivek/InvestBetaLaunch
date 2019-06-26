import React, {Component} from 'react';
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
        <h2 className='col-10 offset-1'>The InvestBeta Advantage</h2>
        <div className='col-10 offset-1 wrapper'>
          <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
        </div>
        <div className='col-10 offset-1 wrapper'>
          <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
        </div>
        <div className='col-10 offset-1 wrapper'>
          <AdvantageLink title='Discover Entreprenuers' text={text} link='Discover'></AdvantageLink>
        </div>
      </div>
    )
  }
}

export default Advantage;