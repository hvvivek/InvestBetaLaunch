import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class OpportunityRow extends Component{
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
        console.log(end)
        console.log(start)
        var end = new Date(end_date);
        var start = new Date(start_date);
        console.log(end)
        console.log(start)
        var year_difference = end.getFullYear() - start.getFullYear();
        if(year_difference > 1) {return `${year_difference} years`}
        else if (year_difference == 1){return `${year_difference} year`}

        var month_difference = end.getMonth() - start.getMonth();
        if(month_difference > 0) {return `${month_difference} months`}
        else if (month_difference == 1){return `${month_difference} month`}

        var day_difference = end.getDate() - start.getDate();
        if(day_difference > 0) {return `${day_difference} days`}
        else if (day_difference == 1){return `${day_difference} day`}

        var hour_difference = end.getHours() - start.getHours();
        if(hour_difference > 0) {return `${hour_difference} hours`}
        else if (hour_difference == 1){return `${hour_difference} hour`}

        var minute_difference = end.getMinutes() - start.getMinutes();
        if(minute_difference > 0) {return `${minute_difference} minutes`}
        else if (minute_difference == 1){return `${minute_difference} minute`}

        return "0 seconds"
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
        axios.get('https://invest-beta.herokuapp.com/api/opportunity-approve?id=' + this.state.data._id)
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

        let business_name = this.state.data.business.name
        let created_on = this.getTimeDifference(new Date(), this.state.data.createdAt);
        let buttons = 
        <Row>
            
        </Row>
        switch(this.props.section)
        {
            case "ACTIVE_OPPORTUNITY":
                buttons = 
                <Row>
                    {/* <Button className='col-4 offset-1 custom-button' onClick={this.handleCreateOpportunity}>Create Opportunity</Button> */}
                    <Button className='col-4 offset-1 custom-button custom-button-inverse' onClick={this.handleSeeOpportunities}>See Opportunity</Button>
                </Row>
                break;
            case "INACTIVE_OPPORTUNITY":
                buttons =
                <Row>
                    {/* <Button className='col-4 offset-1 custom-button' onClick={this.handleReactivateBusiness}>Re-activate Opportunity</Button> */}
                    <Button className='col-4 offset-1 custom-button custom-button-inverse' onClick={this.handleSeeOpportunities}>See Opportunity</Button>
                </Row>
                break;
            case "APPROVAL_OPPORTUNITY":
                buttons =
                <Row>
                    <Button className='col-4 offset-1 custom-button' onClick={this.handleApproveBusiness}>Approve</Button>
                    <Button className='col-4 offset-1 custom-button custom-button-inverse' onClick={this.handleDisapproveBusiness}>Disapprove</Button>
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
                                <p className='col-6 date'>Created {created_on} ago</p>
                                <p className='col-6 date'></p>
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

export default withRouter(OpportunityRow);