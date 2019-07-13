import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, Form, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class OrderApp extends Component{

    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardChange = this.handleCardChange.bind(this);
        this.initiateOrder = this.initiateOrder.bind(this);

        this.state = {
            id: this.props.id, 
            data: {}, 
            price: 0,
            units: 1,
            card_number: '',
            card_month: '',
            card_year: '',
            card_security_code: '',
            card_name: '',
            user_id: ''
        }
    }
  
    componentDidMount()
    {
        this.downloadData()
        this.checkLogin()
    }

    downloadData()
    {
        console.log(this.state.id)
        axios.get('http://localhost:3005/business/opportunity?id=' + this.state.id,{ crossDomain: true })
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

        axios.get('http://localhost:3005/business/opportunity?id=' + this.state.id,{ crossDomain: true })
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

    checkLogin()
    {
        var accessToken = localStorage.getItem('jwt-token');
        console.log(accessToken)
        if(accessToken)
        {

            if(accessToken.length > 0)
            {
                console.log("Getting info from access token")
                let accessToken = localStorage.getItem('jwt-token');
                axios.get('http://localhost:3005/auth/jwt',{headers: {Authorization: `Bearer ${accessToken}`} })
                .then(
                    (res) => {
                    console.log(res)
                        this.setState({user_id: res.data.id})
                    }
                )
                .catch(function (error) {
                    console.log("Error")
                    console.log(error);
                })
                .finally(function () {
                    console.log("Finished downloading data")
                });
            }
        }
    }


    handleCardChange(event)
    {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChange(event)
    {
        this.setState({price: event.target.value * this.state.data.unit_price, units: event.target.value});
    }

    initiateOrder(event)
    {
        event.preventDefault();
        const cost = this.state.price;
        const units = this.state.units;
        const card_name = this.state.card_name;
        const card_month = this.state.card_month;
        const card_year = this.state.card_year;
        const card_number = this.state.card_number;
        const card_security_code = this.state.card_security_code;
        const user_id = this.state.user_id;
        const opportunity_id = this.state.id;
        console.log({
            cost: cost,
            units: units,
            card: {
                name: card_name,
                number: card_number,
                security_code: card_security_code,
                month: card_month,
                year: card_year,
            },
            user_id: user_id,
            id: opportunity_id,
        })

        axios.post('http://localhost:3005/checkout', {
            cost: cost,
            units: units,
            card: {
                name: card_name,
                number: card_number,
                security_code: card_security_code,
                month: card_month,
                year: card_year,
            },
            user_id: user_id,
            id: opportunity_id,
        })
              .then((response) => {
                response = response.data
                if(!response.payment_success || !response.database_success)
                {
                    this.setState({message: response.message});
                }
                else
                {
                    let path = '/account';
                    this.props.history.push(path);
                }

              })
              .catch(function (error) {
                console.log(error);
              });

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
                            <p><i className="fas fa-map-marker-alt"></i> {business_location}</p>
                        </Col>
                        <Col className='text-center uppercase' xs='6' md={{span:'3'}} lg={{span:'2'}}><p>{business_type.toUpperCase()}</p></Col>
                        <Col xs={{span:'6', offset:'3'}} md={{span:'4', offset:'4'}} lg={{span:'2', offset:'5'}}>
                            <Row>
                            <Col xs='4' className='social-media-links'><a href={social_media_fb}><i className="fab fa-facebook"></i></a></Col>
                            <Col xs='4' className='social-media-links'><a href={social_media_in}><i className="fab fa-instagram"></i></a></Col>
                            <Col xs='4' className='social-media-links'><a href={social_media_li}><i className="fab fa-linkedin"></i></a></Col>
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

                        <Col xs='12' lg='6' id="checkout-form">
                        <Col lg={{span:'10', offset:'1'}} xs={{span:'10', offset:'1'}} md={{span:'8', offset:'2'}} className='calculator'>
                                <Row>
                                <InputGroup size="md" className='col-6 col-md-4 offset-md-2 col-lg-5 offset-lg-1'>
                                    <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-lg">Units</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type='number' min='1' placeholder='1' aria-label="Large" value={this.state.units} onChange={this.handleChange} aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>
                                <span className='col-6 text'>x ₦{this.state.data.unit_price} = </span>
                                <span className='col-lg-12 total text'>Total: ₦{this.state.price}</span>
                                </Row>
                                </Col>
                        <Form className='col-12 col-md-10 offset-md-1 col-lg-12 offset-lg-0' onSubmit={this.initiateOrder}>
                            <Row>
                            

                            <Form.Group  className='col-10 offset-1' controlId="formBasicEmail">
                                <Form.Label>Credit card number</Form.Label>
                                <Form.Control name="card_number" value={this.state.card_number} onChange={this.handleCardChange} type="text" placeholder="AAAA-BBBB-CCCC-DDDD" />
                            </Form.Group>

                            
                            <Col xs={{span: '6', offset:'1'}}>
                                <Row>
                                    <p className='col-12'>Valid Through</p>
                                    <Form.Group  className='col-5' controlId="formBasicEmail">
                                        <Form.Control name="card_month" value={this.state.card_month} onChange={this.handleCardChange} type="text" placeholder="MM" />
                                    </Form.Group>

                                    <Form.Group  className='col-7' controlId="formBasicEmail">
                                        <Form.Control name="card_year" value={this.state.card_year} onChange={this.handleCardChange} type="text" placeholder="YYYY" />
                                    </Form.Group>
                                </Row>
                            </Col>

                            <Col xs={{span: '4', offset:'0'}}>
                                <Row>
                                    <p className='col-12'>Security Code</p>
                                    <Form.Group  className='col-12' controlId="formBasicEmail">
                                        <Form.Control name="card_security_code" value={this.state.card_security_code} onChange={this.handleCardChange} type="text" placeholder="XXX" />
                                    </Form.Group>
                                </Row>
                            </Col>

                            <Form.Group  className='col-10 offset-1' controlId="formBasicEmail">
                                <Form.Label>Name on card</Form.Label>
                                <Form.Control name="card_name" value={this.state.card_name} onChange={this.handleCardChange} type="text" placeholder="John Doe" />
                            </Form.Group>

                            
                            <Button className='col-6 offset-3 col-lg-10 offset-lg-1 custom-button' variant="primary" type="submit">
                                Confirm & Pay
                            </Button>
                            </Row>
                            </Form>
                        </Col>
                    </Row>
                    
                    
                    
                    
                </Col>
            </Row>
        }
        return (return_value);
    }
  }

  export default withRouter(OrderApp);