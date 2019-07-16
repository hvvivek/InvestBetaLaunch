import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class OpporunityApp extends Component{

    constructor(props)
    {
      super(props);
      this.handleChange = this.handleChange.bind(this)
      this.handleInvestNow = this.handleInvestNow.bind(this)
      this.state = {id: this.props.id, data: {}}
    }
  
    componentDidMount()
    {
        this.downloadData()
    }

    downloadData()
    {
        console.log(this.state.id)
        axios.get('https://invest-beta.herokuapp.com/business/opportunity?id=' + this.state.id,{ crossDomain: true })
        .then(
            (res) => {
                console.log(res.data)
                this.setState({data: res.data, price: res.data.unit_price})
            }
        )
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            console.log("Finished downloading data")
        });
    }
  
    handleChange(event)
    {
        this.setState({price: event.target.value * this.state.data.unit_price});
    }

    handleInvestNow()
    {
        let path = '/order/'+this.state.id
        this.props.history.push(path)
    }

    render()
    {
        let return_value = <div></div>
        if(Object.keys(this.state.data).length > 0 )
        {
            let business_name = this.state.data.business.name
            let business_location = this.state.data.business.location
            let business_type = this.state.data.business.business_type
            let business_description = this.state.data.business.short_desc

            let requirement = this.state.data.requirement
            let yin = this.state.data.business.years_in_business
            let total_revenue = this.state.data.business.total_revenue
            let profit = this.state.data.business.profit
            let unit_price = this.state.data.unit_price
            let returns = this.state.data.returns
            let funding_to_go = (this.state.data.units - this.state.data.units_sold) * this.state.data.unit_price

            let document_link_1 = this.state.data.uploads[0].link
            let document_link_2 = this.state.data.uploads[1].link
            let document_link_3 = this.state.data.uploads[2].link


            let document_name_1 = this.state.data.uploads[0].link
            let document_name_2 = this.state.data.uploads[1].link
            let document_name_3 = this.state.data.uploads[2].link

            let social_media_fb = this.state.data.business.social_media[0].link
            let social_media_in = this.state.data.business.social_media[1].link
            let social_media_li = this.state.data.business.social_media[2].link
            let fundingLeft = (this.state.data.units - this.state.data.units_sold) * this.state.data.unit_price
            let progress = (this.state.data.units_sold*100)/this.state.data.units

            return_value = 
            <Row id="opportunity-app">
                <Col xs={{span:'12'}} className='header'>
                    <h1>{business_name}</h1>
                    <Row>
                        <Col className='text-center' xs='6' md={{span:'3', offset:'3'}} lg={{span:'2', offset:'4'}}>
                            <p><i class="fas fa-map-marker-alt"></i> {business_location}</p>
                        </Col>
                        <Col className='text-center uppercase' xs='6' md={{span:'3'}} lg={{span:'2'}}><p>{business_type.toUpperCase()}</p></Col>
                        <Col xs={{span:'6', offset:'3'}} md={{span:'4', offset:'4'}} lg={{span:'2', offset:'5'}}>
                            <Row>
                            <Col xs='4' className='social-media-links'><a href={social_media_fb}><i class="fab fa-facebook"></i></a></Col>
                            <Col xs='4' className='social-media-links'><a href={social_media_in}><i class="fab fa-instagram"></i></a></Col>
                            <Col xs='4' className='social-media-links'><a href={social_media_li}><i class="fab fa-linkedin"></i></a></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col xs={{span:'12'}} xl={{span:'10', offset:'1'}}>
                    <Row>
                        <Col xs='12' lg={{span:'5', offset:'1'}} className='img-wrapper'>
                            <img src={this.state.data.picture_link} alt=""></img>
                            <Row>
                            <Col xs={{span:'12'}} md={{span:'6', offset:'1'}}  lg={{span:'7', offset:'0'}} className='section-3'> 
                                <p className="col-12">₦{fundingLeft} to go</p>
                                <Col xs='12'>
                                    <ProgressBar variant="info" now={progress} />
                                </Col>
                                <p className="col-12 time-to-go">Ends in 5 days</p>
                            </Col>

                            <Col xs={{span:'12'}}  md={{span:'5'}} className='section-2'>
                                <p className="col-12">Unit Price</p>
                                <h5 className="col-12">₦{this.state.data.unit_price}</h5>
                                <p className="col-12 returns">{this.state.data.returns}% RETURN IN 12 MONTHS</p>
                            </Col>
                            </Row>
                        </Col>

                        <Col xs='12' lg='6' className='row'>
                            <Row>
                                <Col lg={{span:'10', offset:'1'}} className='d-none d-lg-block calculator'>
                                <Row>
                                <InputGroup size="md" className='col-lg-4 offset-lg-3'>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-lg">Units</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type='number' min='1' placeholder='1' aria-label="Large" onChange={this.handleChange} aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>
                                <span className='col-lg-5 text'>x ₦{this.state.data.unit_price} = </span>
                                <span className='col-lg-12 total text'>₦{this.state.price}</span>
                                <Button className='col-lg-4 offset-lg-4 custom-button' onClick={this.handleInvestNow}>Invest Now</Button>
                                </Row>
                                </Col>
                                <Col xs={{span:'12', offset:'0'}} md={{span:'10', offset:'1'}} lg={{span:'12', offset:'0'}} className='section-5'>
                                    <Col xs='12'>
                                        <h5 className='col-12'>Our Story</h5>
                                        <p className='col-12'>{business_description}</p>
                                    </Col>
                                    <Col xs='12'>
                                        <h5 className='col-12'>Requirement</h5>
                                        <p className='col-12'>{requirement}</p>
                                    </Col>
                                </Col>
                            </Row>
                        </Col>

                        

                        <Col xs={{span:'10', offset:'1'}} md={{span:'5', offset:'1'}}  className='section-4'>
                            <Col xs='12'>
                                <h4>AT A GLANCE</h4>
                                <h5>Years in Business</h5>
                                <p>{yin}</p>
                                <h5>Total Revenue</h5>
                                <p>{total_revenue}</p>
                                <h5>Profits</h5>
                                <p>{profit}</p>
                            </Col>
                        </Col>

                        <Col xs={{span:'10', offset:'1'}} md={{span:'5', offset:'0'}} lg={{span:'4', offset:'1'}} className='section-6'>
                            <h5>Uploads</h5>
                            <Col xs='12' className='doc-wrapper'>
                                <a href={document_link_1}><i class="fas fa-file-pdf"></i> Doc 1</a>
                            </Col>
                            <Col xs='12' className='doc-wrapper'>
                                <a href={document_link_2}><i class="fas fa-file-pdf"></i> Doc 2</a>
                            </Col>

                            <Col xs='12' className='doc-wrapper'>
                                <a href={document_link_3}><i class="fas fa-file-pdf"></i> Doc 3</a>
                            </Col>
                        </Col>
                        
                    </Row>
                    
                    
                    
                    
                </Col>
            </Row>
        }



      return (return_value);
    }
  }

  export default withRouter(OpporunityApp);