import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import BusinessRow from './businessRow';
import OpportunityRow from './opportunityRow';




class AdminApp extends Component{

    constructor(props)
    {
      super(props);
      this.redirect = this.redirect.bind(this);
      this.state = {
          id: this.props.id, 
          active_businesses: [],
          inactive_businesses: [],
          approvals_businesses: [],
          active_opportunities: [],
          inactive_opportunities: [],
          approvals_opportunities: []
        }
    }
  
    componentDidMount()
    {
        this.downloadData()
    }

    downloadData()
    {
        let accessToken = localStorage.getItem('jwt-token');
        // console.log(accessToken)
        axios.get('https://invest-beta.herokuapp.com/api/business-active/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({active_businesses: res.data})
            }
        )
        .catch(function (error) {
            // console.log("Error")
            console.log(error);
        })
        .finally(function () {
            // console.log("Finished downloading data")
        });

        axios.get('https://invest-beta.herokuapp.com/api/business-inactive/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({inactive_businesses: res.data})
            }
        )
        .catch(function (error) {
            // console.log("Error")
            console.log(error);
        })
        .finally(function () {
            // console.log("Finished downloading data")
        });

        axios.get('https://invest-beta.herokuapp.com/api/business-approval-required/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({approvals_businesses: res.data})
            }
        )
        .catch(function (error) {
            // console.log("Error")
            console.log(error);
        })
        .finally(function () {
            // console.log("Finished downloading data")
        });




        axios.get('https://invest-beta.herokuapp.com/api/opportunities-active/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({active_opportunities: res.data})
            }
        )
        .catch(function (error) {
            // console.log("Error")
            console.log(error);
        })
        .finally(function () {
            // console.log("Finished downloading data")
        });

        axios.get('https://invest-beta.herokuapp.com/api/opportunities-inactive/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({inactive_opportunities: res.data})
            }
        )
        .catch(function (error) {
            // console.log("Error")
            console.log(error);
        })
        .finally(function () {
            // console.log("Finished downloading data")
        });

        axios.get('https://invest-beta.herokuapp.com/api/opportunities-approval-required/',{headers: {Authorization: `Bearer ${accessToken}`} })
        .then(
            (res) => {
                // console.log(res.data)
                this.setState({approvals_opportunities: res.data})
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

    redirect(path)
    {
        this.props.history.push(path);
    }
  
    render()
    {
        let rows_business_active = []
        let rows_business_inactive = []
        let rows_business_approvals = []

        if(this.state.active_businesses)
        {
            for(var i=0; i<this.state.active_businesses.length; i++)
            {
                var business = this.state.active_businesses[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                
                    rows_business_active.push(
                        <BusinessRow key={i} data={business} section="ACTIVE_BUSINESS"></BusinessRow>
                    )
                
            }
        }

        if(this.state.inactive_businesses)
        {
            for(var i=0; i<this.state.inactive_businesses.length; i++)
            {
                var business = this.state.inactive_businesses[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                
                    rows_business_inactive.push(
                        <BusinessRow key={i} data={business} section="INACTIVE_BUSINESS"></BusinessRow>
                    )
                
            }
        }

        if(this.state.approvals_businesses)
        {
            for(var i=0; i<this.state.approvals_businesses.length; i++)
            {
                var business = this.state.approvals_businesses[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                
                    rows_business_approvals.push(
                        <BusinessRow key={i} data={business} section="APPROVAL_BUSINESS"></BusinessRow>
                    )
                
            }
        }


        let rows_opportunities_active = []
        let rows_opportunities_inactive = []
        let rows_opportunities_approvals = []

        if(this.state.active_opportunities)
        {
            for(var i=0; i<this.state.active_opportunities.length; i++)
            {
                var opportunities = this.state.active_opportunities[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                
                    rows_opportunities_active.push(
                        <OpportunityRow key={i} data={opportunities} section="ACTIVE_OPPORTUNITY"></OpportunityRow>
                    )
                
            }
        }

        if(this.state.inactive_opportunities)
        {
            for(var i=0; i<this.state.inactive_opportunities.length; i++)
            {
                var opportunities = this.state.inactive_opportunities[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                
                    rows_opportunities_inactive.push(
                        <OpportunityRow key={i} data={opportunities} section="INACTIVE_OPPORTUNITY"></OpportunityRow>
                    )
                
            }
        }

        if(this.state.approvals_opportunities)
        {
            for(var i=0; i<this.state.approvals_opportunities.length; i++)
            {
                var opportunities = this.state.approvals_opportunities[i]
                // console.log(new Date(investment.opportunity.maturity) - new Date())
                
                    rows_opportunities_approvals.push(
                        <OpportunityRow key={i} data={opportunities} section="APPROVAL_OPPORTUNITY"></OpportunityRow>
                    )
                
            }
        }

      return <div className='container' id="admin-page"> 
              <h1 className="d-none d-lg-block col-12 col-md-12 col-lg-12">Welcome!</h1>
          <Row>
              <Col xs={{span:'12'}} md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}}>
                <Row>
                    <h3 className='col-12'>Active Businesses</h3>
                    {rows_business_active}
                </Row>
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}}>
                <Row>
                <h3 className='col-12'>Inactive Businesses</h3>
                    {rows_business_inactive}
                </Row>
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}} className='past-investments'>
                <Row>
                <h3 className='col-12'>Approve Businesses</h3>
                    {rows_business_approvals}
                </Row>
            </Col>

            
        </Row>

        <Row>
                <Col xs={{span:'12'}} md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}}>
                    <Row>
                        <h3 className='col-12'>Active Opportunities</h3>
                        {rows_opportunities_active}
                    </Row>
                </Col>
                <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}}>
                    <Row>
                        <h3 className='col-12'>Inactive Opportunities</h3>
                        {rows_opportunities_inactive}
                    </Row>
                    </Col>
                <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}} className='past-investments'>
                    <Row>
                        <h3 className='col-12'>Approve Opportunities</h3>
                        {rows_opportunities_approvals}
                    </Row>
                </Col>
            </Row>

        <Button className='custom-button col-4 offset-4 col-lg-2 offset-lg-5' onClick={()=>{this.redirect("/register")}}>Create Business</Button>
      </div>;
    }
  }

  export default withRouter(AdminApp);