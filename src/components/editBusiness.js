import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, Form, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Formik} from 'formik';

class EditBusinessApp extends Component{

    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            id: this.props.id || '',
            data:{}
        }
    }
  
    componentDidMount()
    {
        this.downloadData()
    }

    downloadData()
    {

        axios.get('https://invest-beta.herokuapp.com/api/business?id=' + this.state.id)
            .then(
                (res) => {
                    console.log(res.data)
                    this.setState({data: res.data.data})
                }
            )
            .catch(function (error) {
                // console.log("Error")
                console.log(error);
            })
            .finally(function () {
                // console.log("Finished downloading data")
            });
    }

    getTimeDifference(end, start)
    {
        var year_difference = end.getFullYear() - start.getFullYear();
        if(year_difference > 1) {return `${year_difference} YEARS`}
        else if (year_difference == 1){return `${year_difference} YEAR`}

        var month_difference = end.getMonth() - start.getMonth();
        if(month_difference > 0) {return `${month_difference} MONTHS`}
        else if (month_difference == 1){return `${month_difference} MONTH`}

        var day_difference = end.getDate() - start.getDate();
        if(day_difference > 0) {return `${day_difference} DAYS`}
        else if (day_difference == 1){return `${day_difference} DAY`}
    }

    handleSubmit(values)
    {
        let body = {}
        body.id                 = this.state.id
        body.business_name      = values.name
        body.business_type      = values.business_type
        body.location           = values.city
        body.short_desc         = values.description
        body.total_revenue      = values.revenue
        body.profit             = values.profit
        body.facebook           = values.fb_link
        body.instagram          = values.insta_link
        body.linkedin           = values.li_link

        axios.post('https://invest-beta.herokuapp.com/api/edit-business', body)
              .then((response) => {
                response = response.data
                if(response.status)
                {
                    //If admin
                    this.props.history.push("/admin")
                    //else
                    //this.props.history.push("/")

                }
                console.log(response)

              })
              .catch(function (error) {
                console.log(error);
              });
    }


    render()
    {

        let return_value = <div></div>
        let fb_link = ''
        let insta_link = ''
        let li_link = ''
        if(this.state.data.social_media)
        {
            fb_link = this.state.data.social_media.filter(function(a){
                return a.platform == "FACEBOOK"
            })[0].link

            insta_link = this.state.data.social_media.filter(function(a){
                return a.platform == "INSTAGRAM"
            })[0].link

            li_link = this.state.data.social_media.filter(function(a){
                return a.platform == "LINKEDIN"
            })[0].link
        }

        return_value = 
        <Col xs='12' id="business-reg-app">
            <h1>Edit Business</h1>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: this.state.data.name,
                    business_type: this.state.data.business_type,
                    description: this.state.data.short_desc,
                    address: '',
                    city: this.state.data.location,
                    since: '',
                    revenue: this.state.data.total_revenue,
                    profit: this.state.data.profit,
                    fb_link: fb_link,
                    insta_link: insta_link,
                    li_link: li_link,
                    email: '',
                    password: ''
                }}
                onSubmit={this.handleSubmit}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) =>
                    (
                        <Row>
                            <Form className='col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2' noValidate onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs="12" lg="6">
                                    <h3 className='col-10 offset-1'>Business Info</h3>
                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Name of Business</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            placeholder={"Eg. Debo's Farm Machinery"}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Business Type</Form.Label>
                                            <Form.Control name='business_type' value={values.business_type} onChange={handleChange} as="select">
                                                <option value=''>Choose...</option>
                                                <option value='Agribusiness'>Agribusiness</option>
                                                <option value='Financial Services'>Financial Services</option>
                                                <option value='Technology'>Technology</option>
                                                <option value='Services'>Services</option>
                                                <option value='Food & Beverages'>Food & Beverages</option>
                                                <option value='Oil & Gas'>Oil & Gas</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Description</Form.Label>
                                            <Form.Control
                                            as="textarea" 
                                            rows="15"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            placeholder={"Eg. We are a ... business ... in ..., Nigeria. We specialize in..."}
                                            />
                                        </Form.Group>
                                    </Col>
                                    </Col>
                                    <Col xs="12" lg="6">
                                    <h3 className='col-10 offset-1'>Business Location</h3>

                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">City</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            placeholder={"Eg. Lagos, Nigeria"}
                                            />
                                        </Form.Group>
                                    </Col>

                                    
                                    <h3 className='col-10 offset-1'>Business Operations</h3>

                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Total Revenue</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="revenue"
                                            value={values.revenue}
                                            onChange={handleChange}
                                            placeholder={"Eg. N80,00,000"}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Total Profit</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="profit"
                                            value={values.profit}
                                            onChange={handleChange}
                                            placeholder={"Eg. N80,00,000"}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <h3 className='col-10 offset-1'>More Details</h3>

                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Social Media Links</Form.Label>
                                                <Col xs={{span:'12'}}>
                                                    <Row>
                                                        <i className="col-3 fab fa-facebook"></i>
                                                        <Form.Control
                                                        type="text"
                                                        name="fb_link"
                                                        value={values.fb_link}
                                                        onChange={handleChange}
                                                        className='col-9'
                                                        placeholder={"Eg.facebook.com/business-name"}
                                                        />
                                                    </Row>  
                                                </Col>
                                                <br></br>
                                                <Col xs={{span:'12'}}>
                                                    <Row>
                                                        <i className="col-3 fab fa-instagram"></i>
                                                        <Form.Control
                                                        type="text"
                                                        name="insta_link"
                                                        value={values.insta_link}
                                                        onChange={handleChange}
                                                        className='col-9'
                                                        placeholder={"Eg.instagram.com/business-name"}
                                                        />
                                                    </Row>  
                                                </Col>
                                                <br></br>
                                                <Col xs={{span:'12'}}>
                                                    <Row>
                                                        <i className="col-3 fab fa-linkedin"></i>
                                                        <Form.Control
                                                        type="text"
                                                        name="li_link"
                                                        value={values.li_link}
                                                        onChange={handleChange}
                                                        className='col-9'
                                                        placeholder={"Eg.linkedin.com/business-name"}
                                                        />
                                                    </Row>  
                                                </Col>

                                        </Form.Group>
                                    </Col>
                                    </Col>


                                    <Col xs={{span:'10', offset:'1'}} lg={{span:'6', offset:'3'}}>
                                        <Button className='col-8 offset-2 custom-button' type="submit">Submit</Button>
                                    </Col>
                            </Row>
                        </Form>
                    </Row>
                    )}
                </Formik>
            </Col>
        return (return_value);
    }
  }

  export default withRouter(EditBusinessApp);