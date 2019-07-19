import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class OpportunityRow extends Component{
    constructor(props)
    {
        super(props);
        this.state = {data:this.props.data}
    }

    getFormattedDate(dateString)
    {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

    getYearDifference(end_date, start_date)
    {
        var end = new Date(end_date);
        var start = new Date(start_date);
        return Math.abs(end - start)/(1000*60*60*24*365)
    }

    render() {
        console.log(this.state.data)

        let business_name = this.state.data.business.name
        let start_date = this.getFormattedDate(this.state.data.createdAt);
        let end_date = this.getFormattedDate(this.state.data.maturity);
        let investment = this.state.data.units_sold * this.state.data.unit_price;
        let time_period = this.getTimeDifference(end_date, start_date);
        let returns = this.state.data.returns;
        let totaldue = investment * returns * 0.01 * this.getYearDifference(end_date, start_date);

        return (
            <Col xs='12' className='investment_row opportunity_row'>
                <Row>
                    <Col xs='12'>
                        <h4 className='col-12'>{business_name}</h4>
                        <Col xs='12'>
                            <Row>
                                <p className='col-5 date'>{start_date}</p>
                                <p className='col-2 date'><i className="fas fa-long-arrow-alt-right"></i></p>
                                <p className='col-5 date'>{end_date}</p>
                            </Row>
                        </Col>
                    </Col>
                    <Col xs='12'>
                        <h2 className='col-12'>₦{investment}</h2>
                        <p className='col-12 returns'>{returns}% IN {time_period}</p>
                    </Col>
                    <Col xs='12'>
                        <h4 className='col-12'>Total Due: {investment + Math.round(totaldue)}</h4>
                    </Col>
                </Row>
            </Col>
        )
    }
}

class BusinessAccountApp extends Component{

    constructor(props)
    {
      super(props);
      this.state = {id: this.props.id, data: {}}
    }
  
    componentDidMount()
    {
        this.downloadData()
    }

    downloadData()
    {
        let accessToken = localStorage.getItem('jwt-token');
        // console.log(accessToken)
        axios.get('https://invest-beta.herokuapp.com/account/business',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({data: res.data})
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

    getReturns(investment)
    {
        let start = new Date(investment.createdAt);
        let end = new Date(investment.maturity);

        let diff = (end.getTime() - start.getTime())/1000
        diff = diff/(60 * 60 * 24)
        diff = diff/365.25
        
        var returns = (((investment.unit_price * investment.units_sold) * investment.returns * diff)/100)
        returns = Math.round(returns);
        return returns
    }
  
    render()
    {
        let rows_upcoming               = []
        let rows_past                   = []
        let total_current_investments   = 0
        let total_past_investments      = 0
        let total_current_returns       = 0
        let total_past_returns          = 0

        console.log(this.state.data)
        if(this.state.data.opportunities)
        {
            for(var i=0; i<this.state.data.opportunities.length; i++)
            {
                var investment = this.state.data.opportunities[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                if(investment && new Date(investment.maturity) - new Date() > 0)
                {
                    total_current_investments = total_current_investments + (investment.unit_price * investment.units_sold)
                    // console.log("TCI" + total_current_investments)
                    total_current_returns = total_current_returns + this.getReturns(investment)
                    rows_upcoming.push(
                        <OpportunityRow key={i} data={investment}></OpportunityRow>
                    )
                }
                else if(investment){
                    total_past_investments = total_past_investments + (investment.unit_price * investment.units_sold)
                    total_past_returns = total_past_returns + this.getReturns(investment)
                    rows_past.push(
                        <OpportunityRow key={i} data={investment}></OpportunityRow>
                    )
                }
            }
        }
        // return <div></div>
      return <Col xs='12' lg={{span:'10', offset:'1'}} id="account-page"> 
              <h1 className="d-none d-lg-block col-12 col-md-12 col-lg-12">Welcome!</h1>
          <Row>
              <Col xs={{span:'12'}} lg={{span:'3'}}>
              <h1 className="d-block col-12 col-md-12 col-lg-12 d-lg-none">Welcome!</h1>
              <Col xs={{span:'10', offset:'1'}} md={{span:'6', offset:'3'}} lg={{span:'12', offset:'0'}} className='glance'>
                  <Row>
                    <h5 className="col-12">YOUR ACCOUNT AT A GLANCE</h5>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'1'}}>
                    <Row>
                        <h6 className="col-12">Total Current Loans:</h6>
                        <h2 className="col-12">₦{total_current_investments}</h2>
                    </Row>
                    </Col>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'0'}}>
                    <Row>
                        <h6 className="col-12">Total Expected Interest:</h6>
                        <h2 className="col-12">₦{total_current_returns}</h2>
                    </Row>
                    </Col>
                    <br></br>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'1'}}>
                    <Row>
                        <h6 className="col-12">Total Past Loans:</h6>
                        <h2 className="col-12">₦{total_past_investments}</h2>
                    </Row>
                    </Col>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'0'}}>
                    <Row>
                        <h6 className="col-12">Total Past Interests:</h6>
                        <h2 className="col-12">₦{total_past_returns}</h2>
                    </Row>
                    </Col>

                    </Row>
              </Col>
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'5', offset:'0'}}>
            <h3>Current Investments</h3>
            <Row>
                {rows_upcoming}
            </Row>
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}} className='past-investments'>
            <h3>Past Investments</h3>
            <Row>
                {rows_past}
            </Row>
            </Col>
        </Row>

        <Button className='custom-button col-4 offset-4 col-lg-2 offset-lg-5' onClick={() => {this.props.history.push('/discover')}}>Create Opportunity</Button>
      </Col>;
    }
  }

  export default withRouter(BusinessAccountApp);