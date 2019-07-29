import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, Form, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Formik} from 'formik';

class EditOpportunityApp extends Component{

    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.downloadData = this.downloadData.bind(this);
        this.state = {
            opportunity_id: this.props.id,
            data: {}
            // business_id: this.props.id
        }
    }
  
    componentDidMount()
    {
        this.downloadData()
    }

    downloadData()
    {
        axios.get('https://invest-beta.herokuapp.com/api/opportunity?id=' + this.state.opportunity_id)
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
        // let body = {}
        var body = new FormData();
        body.append("id", this.state.opportunity_id)
        body.append("business", this.state.business_id)
        body.append("requirement", values.description)
        body.append("unit_price", values.ppu)
        body.append("units", values.units)
        if(values.picture_link != null)
        {
            body.append("picture_link", values.picture_link)
        }
        body.append("approval_status", false)
        for(var pair of body.entries()) {
            console.log(pair[0]+', '+pair[1]);
          }

        console.log(body)

        axios.post('https://invest-beta.herokuapp.com/api/edit-opportunity', body, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
              .then((response) => {
                response = response.data
                if(response.status)
                {
                    this.props.history.push("/opportunity/" + response.id)
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
        return_value = 
        <Col xs='12' id="business-reg-app">
            <h1>Edit Opportunity</h1>

            <Formik
                enableReinitialize={true} 
                initialValues={{
                    description: this.state.data.requirement,
                    picture_link: null,
                    doc1: null,
                    doc2: null,
                    doc3: null,
                    ppu: this.state.data.unit_price,
                    units: this.state.data.units,
                }}
                onSubmit={this.handleSubmit}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    }) =>
                    (
                        <Row>
                            <Form className='col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2' noValidate onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={{span:'12'}} lg='6'>

                                    <h3 className='col-10 offset-1'>What do you need investment for?</h3>
                                    <Col xs={{span:'10', offset:'1'}} lg={{span:'12'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Requirement Description</Form.Label>
                                            <Form.Control
                                            as="textarea" 
                                            rows="3"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            placeholder={"Eg. We are a ... business ... in ..., Nigeria. We specialize in..."}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <h3 className='col-10 offset-1'>Upload a cover picture</h3>

                                    <Col xs={{span:'10', offset:'1'}} lg={{span:'12'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Cover Picture</Form.Label>
                                            <Form.Control
                                            type="file"
                                            name="picture_link"
                                            // value={values.cover_pic}
                                            onChange={(event) => {
                                                console.log(event.target.files)
                                                setFieldValue("picture_link", event.target.files[0])}}
                                            placeholder={"Building Number, Street Name, Locality"}
                                            />
                                        </Form.Group>
                                        <img className="col-12" src={this.state.data.picture_link}></img>

                                    </Col>

                                    </Col>

                                    <Col xs={{span:'12'}} lg='6'>

                                    <h3 className='col-10 offset-1'>Investment Details</h3>


                                    <Col xs={{span:'10', offset:'1'}} lg={{span:'12'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Price per Unit</Form.Label>
                                            <Form.Control
                                            type="number"
                                            name="ppu"
                                            value={values.ppu}
                                            onChange={handleChange}
                                            placeholder={"Eg. N80,00,000"}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={{span:'10', offset:'1'}} lg={{span:'12'}}>
                                        <Form.Group>
                                            <Form.Label className="col-12">Number of Units</Form.Label>
                                            <Form.Control
                                            type="number"
                                            name="units"
                                            value={values.units}
                                            onChange={handleChange}
                                            placeholder={"Eg. N80,00,000"}
                                            />
                                        </Form.Group>
                                    </Col>
=
                                    </Col>
                                    <Col xs={{span:'10', offset:'1'}}>
                                        <Button className='col-8 offset-2 col-xl-4 offset-xl-4 custom-button' type="submit">Edit</Button>
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

  export default withRouter(EditOpportunityApp);