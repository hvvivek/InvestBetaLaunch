import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class BusinessRow extends Component{
    constructor(props)
    {
        super(props);
        this.handleApproveBusiness = this.handleApproveBusiness.bind(this);
        this.handleCreateOpportunity = this.handleCreateOpportunity.bind(this);
        this.handleDisapproveBusiness = this.handleDisapproveBusiness.bind(this);
        this.handleReactivateBusiness = this.handleReactivateBusiness.bind(this);
        this.handleSeeOpportunities = this.handleSeeOpportunities.bind(this);
        this.state = {
            data:this.props.data,
            section: this.props.section
        }
    }

    getFormattedDate(dateString)
    {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
        let datetime = new Date(dateString);
        var date = datetime.getDate();
        var month = monthNames[datetime.getMonth()];
        var year = datetime.getFullYear();

        return `${date} ${month} ${year}`
    }

    getTimeDifference(end_date, start_date)
    {
        var end = new Date(end_date);
        var start = new Date(start_date);

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

    handleCreateOpportunity(event)
    {
        let path = '/create/' + this.state.data._id
        this.props.history.push(path)
    }

    handleReactivateBusiness(event)
    {
        
    }

    handleSeeOpportunities(event)
    {
        
    }

    handleApproveBusiness(event)
    {
        axios.get('http://localhost:3005/api/business-approve?id=' + this.state.data._id)
        .then(
            (res) => {
                console.log(res.data)
                this.props.history.push("/admin")
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

    handleDisapproveBusiness(event)
    {
        
    }

    render() {

        let business_name = this.state.data.name
        let location = this.state.data.location;
        let business_type = this.state.data.business_type;
        let buttons = 
        <Row>
            
        </Row>
        switch(this.props.section)
        {
            case "ACTIVE_BUSINESS":
                buttons = 
                <Row>
                    <Button className='col-4 offset-1 custom-button' onClick={this.handleCreateOpportunity}>Create Opportunity</Button>
                    <Button className='col-4 offset-1 custom-button custom-button-inverse' onClick={this.handleSeeOpportunities}>See Opportunities</Button>
                </Row>
                break;
            case "INACTIVE_BUSINESS":
                buttons =
                <Row>
                    <Button className='col-4 offset-1 custom-button' onClick={this.handleReactivateBusiness}>Re-activate Business</Button>
                    <Button className='col-4 offset-1 custom-button custom-button-inverse' onClick={this.handleSeeOpportunities}>See Opportunities</Button>
                </Row>
                break;
            case "APPROVAL_BUSINESS":
                buttons =
                <Row>
                    <Button className='col-4 offset-1 custom-button' onClick={this.handleApproveBusiness}>Approve Business</Button>
                    <Button className='col-4 offset-1 custom-button custom-button-inverse' onClick={this.handleDisapproveBusiness}>Disapprove Business</Button>
                </Row>
                break;
            default:
                break;
        }
        return (
            <Col xs='12' className='investment_row'>
                <Row>
                    <Col xs='12'>
                        <h4 className='col-12'>{business_name}</h4>
                        <Col xs='12'>
                            <Row>
                                <p className='col-6 date'>{location}</p>
                                <p className='col-6 date'>{business_type}</p>
                            </Row>
                        </Col>
                    </Col>
                    <Col xs='12'>
                        {buttons}
                    </Col>
                </Row>
            </Col>
        )
    }
}

export default withRouter(BusinessRow);