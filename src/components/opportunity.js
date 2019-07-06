import React, {Component} from 'react';
import {Col, ProgressBar} from 'react-bootstrap';
import agribusiness_img from '../images/agribusiness.png'
import { withRouter } from 'react-router-dom';

const PLACEHOLDER_IMAGE = 'https://images.theconversation.com/files/210056/original/file-20180313-30961-1z04r7d.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'

class Opportunity extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this)
    this.state = {text: this.props.text, img: this.props.img, data:this.props.value, business:this.props.value.business}
  }

  componentWillReceiveProps(props)
  {
    this.setState({data:props.value, business:props.value.business})

  }

  routeChange()
  {
    let path = '/opportunity/' + this.state.data._id;
    this.props.history.push(path);
  }

  render() {
    console.log("Rendering card again")
    let fundingLeft = (this.state.data.units - this.state.data.units_sold) * this.state.data.unit_price
    let progress = (this.state.data.units_sold*100)/this.state.data.units
    return (
        <div className='opportunity' onClick={this.routeChange}>
          <div className="row">
            <div className="col-12 business-img">
              <img src={this.state.data.picture_link} alt=""></img>
            </div>

            <section className="section-1 col-12">
              <span className="col-12"><img className="business-type-image" src={agribusiness_img} alt=""></img> {this.state.business.business_type.toUpperCase()}</span>
              <h4 className="col-12">{this.state.business.name}</h4>
              <p className="col-12">{this.state.business.location}</p>
            </section>

            <section className="section-2 col-12">
              <p className="col-12">Unit Price</p>
              <h5 className="col-12">₦{this.state.data.unit_price}</h5>
              <p className="col-12 returns">{this.state.data.returns}% RETURN IN 12 MONTHS</p>
            </section>

            <section className="section-3 col-12">
              <p className="col-12">₦{fundingLeft} to go</p>
              {/* Progress Bar */}
              <Col xs='12'>
                <ProgressBar variant="info" now={progress} />
              </Col>
              <p className="col-12 time-to-go">Ends in 5 days</p>
            </section>
          </div>
        </div>
    )
  }
}

export default withRouter(Opportunity);