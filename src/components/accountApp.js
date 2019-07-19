import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { userInfo } from 'os';


class InvestmentRow extends Component{
    constructor(props)
    {
        super(props);
        this.state = {data:this.props.data}
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

    render() {
        console.log(this.state.data)
        let business_name = this.state.data.opportunity.business.name
        let start_date = this.getFormattedDate(this.state.data.opportunity.createdAt);
        let end_date = this.getFormattedDate(this.state.data.opportunity.maturity);
        let investment = this.state.data.units * this.state.data.opportunity.unit_price;
        let time_period = this.getTimeDifference(end_date, start_date);
        let returns = this.state.data.opportunity.returns;
        return (
            <Col xs='12' className='investment_row'>
                <Row>
                    <Col xs='7'>
                        <h4 className='col-12'>{business_name}</h4>
                        <Col xs='12'>
                            <Row>
                                <p className='col-5 date'>{start_date}</p>
                                <p className='col-2 date'><i className="fas fa-long-arrow-alt-right"></i></p>
                                <p className='col-5 date'>{end_date}</p>
                            </Row>
                        </Col>
                    </Col>
                    <Col xs='5'>
                        <h2 className='col-12'>₦{investment}</h2>
                        <p className='col-12 returns'>{returns}% IN {time_period}</p>
                    </Col>
                </Row>
            </Col>
        )
    }
}
class AccountApp extends Component{

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
        axios.get('https://invest-beta.herokuapp.com/account/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                console.log(res.data)
                
                if(res.data.type == "BUSINESS")
                {
                    this.props.history.push("/business")
                }
                else if(res.data.type == "ADMIN")
                {
                    this.props.history.push("/admin")
                }

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
        let start = new Date(investment.opportunity.createdAt);
        let end = new Date(investment.opportunity.maturity);

        let diff = (end.getTime() - start.getTime())/1000
        diff = diff/(60 * 60 * 24)
        diff = diff/365.25
        
        var returns = (((investment.opportunity.unit_price * investment.units) * investment.opportunity.returns * diff)/100)
        returns = Math.round(returns);
        return returns
    }
  
    render()
    {
        let rows_upcoming = []
        let rows_past = []
        let total_current_investments = 0
        let total_past_investments = 0
        let total_current_returns = 0
        let total_past_returns = 0
        console.log(this.state.data)
        if(this.state.data.investments)
        {
            for(var i=0; i<this.state.data.investments.length; i++)
            {
                var investment = this.state.data.investments[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                if(investment.opportunity && new Date(investment.opportunity.maturity) - new Date() > 0)
                {
                    total_current_investments = total_current_investments + (investment.opportunity.unit_price * investment.units)
                    // console.log("TCI" + total_current_investments)
                    total_current_returns = total_current_returns + this.getReturns(investment)
                    rows_upcoming.push(
                        <InvestmentRow key={i} data={investment}></InvestmentRow>
                    )
                }
                else if(investment.opportunity){
                    total_past_investments = total_past_investments + (investment.opportunity.unit_price * investment.units)
                    total_past_returns = total_past_returns + this.getReturns(investment)
                    rows_past.push(
                        <InvestmentRow key={i} data={investment}></InvestmentRow>
                    )
                }
            }
        }
      return <div className='container' id="account-page"> 
              <h1 className="d-none d-lg-block col-12 col-md-12 col-lg-12">Welcome!</h1>
          <Row>
              <Col xs={{span:'12'}} lg={{span:'3'}}>
              <h1 className="d-block col-12 col-md-12 col-lg-12 d-lg-none">Welcome!</h1>
              <Col xs={{span:'10', offset:'1'}} md={{span:'6', offset:'3'}} lg={{span:'12', offset:'0'}} className='glance'>
                  <Row>
                    <h5 className="col-12">YOUR ACCOUNT AT A GLANCE</h5>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'1'}}>
                    <Row>
                        <h6 className="col-12">Total Current Investments:</h6>
                        <h2 className="col-12">₦{total_current_investments}</h2>
                    </Row>
                    </Col>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'0'}}>
                    <Row>
                        <h6 className="col-12">Total Expected Returns:</h6>
                        <h2 className="col-12">₦{total_current_returns}</h2>
                    </Row>
                    </Col>
                    <br></br>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'1'}}>
                    <Row>
                        <h6 className="col-12">Total Past Investments:</h6>
                        <h2 className="col-12">₦{total_past_investments}</h2>
                    </Row>
                    </Col>
                    <Col xs={{span:'12'}} lg={{span:'5', offset:'0'}}>
                    <Row>
                        <h6 className="col-12">Total Past Returns:</h6>
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

        <Button className='custom-button col-4 offset-4 col-lg-2 offset-lg-5' onClick={() => {this.props.history.push('/discover')}}>Discover More</Button>
      </div>;
    }
  }

  export default withRouter(AccountApp);