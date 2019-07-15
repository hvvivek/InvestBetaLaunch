import React, {Component} from 'react';
import {Button, Col, Row, ProgressBar, FormControl, InputGroup} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import BusinessRow from './businessRow';




class AdminApp extends Component{

    constructor(props)
    {
      super(props);
      this.redirect = this.redirect.bind(this);
      this.state = {
          id: this.props.id, 
          active_businesses: [],
          inactive_businesses: [],
          approvals_businesses: []
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
        axios.get('http://localhost:3005/api/business-active/',{headers: {Authorization: `Bearer ${accessToken}`} })
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

        axios.get('http://localhost:3005/api/business-inactive/',{headers: {Authorization: `Bearer ${accessToken}`} })
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

        axios.get('http://localhost:3005/api/business-approval-required/',{headers: {Authorization: `Bearer ${accessToken}`} })
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
      return <Col xs='12' lg={{span:'10', offset:'1'}} id="admin-page"> 
              <h1 className="d-none d-lg-block col-12 col-md-12 col-lg-12">Welcome!</h1>
          <Row>
              <Col xs={{span:'12'}} lg={{span:'4'}}>
                <Row>
                    <h3 className='col-12'>Active Businesses</h3>
                    {rows_business_active}
                </Row>
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}}>
                <Row>
                    <h3>Inactive Businesses</h3>
                    {rows_business_inactive}
                </Row>
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}} className='past-investments'>
                <Row>
                    <h3>Approve Businesses</h3>
                    {rows_business_approvals}
                </Row>
            </Col>

            <Col xs={{span:'12'}} lg={{span:'4'}}>
              <h3>Active Opportunities</h3>
              
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}}>
            <h3>Inactive Opportunities</h3>
            
            </Col>
            <Col xs='12' md={{span:'8', offset:'2'}} lg={{span:'4', offset:'0'}} className='past-investments'>
            <h3>Approve Opportunities</h3>
            
            </Col>
        </Row>

        <Button className='custom-button col-4 offset-4 col-lg-2 offset-lg-5' onClick={()=>{this.redirect("/register")}}>Create Business</Button>
        <Button className='custom-button col-4 offset-4 col-lg-2 offset-lg-5'>Create Opportunity</Button>

      </Col>;
    }
  }

  export default withRouter(AdminApp);