import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Opportunity from './opportunity';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link}
  }

  render() {
    let opportunities = []
    for(var i=0; i<10; i++)
    {
      opportunities.push(<Opportunity></Opportunity>)
    }
    return (
        <div className='row' id='discover'>
            <h3 className='col-10 offset-1'>Discover</h3>
            <Button className='next'><i class="fas fa-chevron-right"></i></Button>
            <div className='col-12 wrapper'>
              <div className='opportunities-wrapper'>
                {opportunities}
              </div>
              <div className='row see-all-link'>
                <a href="/" className='col-12'>SEE ALL OPPORTUNITIES <i class="fas fa-chevron-right"></i></a>
              </div>
            </div>
        </div>
    )
  }
}

export default Discover;