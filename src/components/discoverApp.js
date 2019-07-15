import React, {Component} from 'react';
import {Button, Col, Row, InputGroup, FormControl, Dropdown} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';

class DiscoverApp extends Component {
    constructor(props) {
      super(props);
      this.downloadData = this.downloadData.bind(this)
      this.sort = this.sort.bind(this)
      this.handleSearch = this.handleSearch.bind(this)

      this.state = {
          data                      : [], 
          original_data             : [], 
          locations                 : [], 
          business_type             : [], 
          original_locations        : [], 
          original_business_type    : []
        }
    }

    componentDidMount()
    {
        this.downloadData()
    }

    downloadData()
    {
        axios.get('http://www.investbeta.com/business/opportunities',{ crossDomain: true })
        .then(
            (res) => {
                let locations = []
                let business_type = []

                for (var i = 0; i < res.data.length; i++) {
                    locations.push(res.data[i].business.location)
                    business_type.push(res.data[i].business.business_type)
                }
    
                locations = locations.filter(function (item, index) {
                    return locations.indexOf(item) >= index;
                });
    
                business_type = business_type.filter(function (item, index) {
                    return business_type.indexOf(item) >= index;
                });
                console.log(res.data)
                this.setState({
                    data: res.data, 
                    original_data: res.data, 
                    locations: locations, 
                    business_type: business_type,
                    original_locations: locations.slice(),
                    original_business_type: business_type.slice()
                })
            }
        )
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            console.log("Finished downloading data")
        });
    }
  
    
    filter(a, b, c) {
        console.log(a)
        console.log(b)
        console.log(c)

        var full_data = this.state.original_data
        switch (b) {
            case "LOCATION":
                var index = this.state.locations.indexOf(a)
                var locations = this.state.locations
                if (index >= 0) {
                    locations.splice(index, 1)
                }
                else {
                    locations.push(a)
                }

                console.log(locations)
                full_data = full_data.filter(function (el) {
                    console.log(locations.indexOf(el.business.location))
                    return locations.indexOf(el.business.location) >= 0
                })

                console.log(full_data)
                this.setState({ data: full_data, locations: locations })
                break;
            case "BUSINESS_TYPE":
                var index = this.state.business_type.indexOf(a)
                var business_type = this.state.business_type
                if (index >= 0) {
                    business_type.splice(index, 1)
                }
                else {
                    business_type.push(a)
                }

                console.log(business_type)
                full_data = full_data.filter(function (el) {
                    console.log(business_type.indexOf(el.business.business_type))
                    return business_type.indexOf(el.business.business_type) >= 0
                })

                console.log(full_data)
                this.setState({ data: full_data, business_type: business_type })
                break;
            default:
                break;
        }

    }

    sort(key) {
        // var sorted_array = this.state.data
        var sorted_array = [...this.state.data];
        switch (key) {
            case "RETURNS":
                sorted_array.sort(function (a, b) {
                    return parseInt(a.returns) - parseInt(b.returns)
                })
                console.log(sorted_array)
                this.setState({ data: sorted_array })
                break;
            case "AMOUNT_RAISED":
                sorted_array.sort(function (a, b) {
                    return parseInt(a.unit_price * a.units_sold) - parseInt(b.unit_price * b.units_sold)
                })
                this.setState({ data: sorted_array })
                break;
            case "PRICE_PER_UNIT":
                sorted_array.sort(function (a, b) {
                    console.log(a.unit_price)
                    return parseInt(a.unit_price) - parseInt(b.unit_price)
                })
                // console.log(sorted_array)
                // this.setState({ data: sorted_array })
                break;
            case "REQUIRED":
                sorted_array.sort(function (a, b) {
                    return parseInt(a.unit_price * a.units) - parseInt(b.unit_price * b.units)
                })
                this.setState({ data: sorted_array })
                break;
            case "MATURITY_PERIOD":
                sorted_array.sort(function (a, b) {
                    return new Date(a.maturity) - new Date(b.maturity)
                })
                this.setState({ data: sorted_array })
                break;
            default:
                break;
        }

    }

    handleSearch(event)
    {
        var search_keyword = event.target.value;

        var full_data = this.state.original_data
        full_data = full_data.filter(function (el) {
            return el.business.name.toUpperCase().includes(search_keyword.toUpperCase()) || el.business.business_type.toUpperCase().includes(search_keyword.toUpperCase()) || el.business.location.toUpperCase().includes(search_keyword.toUpperCase())
        })

        this.setState({ data: full_data })
        
    }

    render() {

        const opportunities = []
        if(this.state.data.length > 0)
        {
            for(var i=0; i<this.state.data.length; i++)
            {
                opportunities.push(
                    <Col xs={{span:'12'}} sm={{span:'6'}} lg={{span:'3'}} key={i}>
                        <Opportunity value={this.state.data[i]} className="col-12 col-sm-6 col-lg-3"></Opportunity>
                    </Col>
                )
            }
        
            
            var location_doms       = []
            var business_type_doms  = []
            
            var locations       = this.state.original_locations
            var business_type   = this.state.original_business_type

            for (var i = 0; i < locations.length; i++) {
                location_doms.push(
                <div className="dropdown-item" key={i}>
                    <input type="checkbox" 
                        key={i} 
                        value={locations[i]} 
                        checked={this.state.locations.indexOf(locations[i]) >= 0} 
                        onChange={this.filter.bind(this, locations[i], "LOCATION")} />
                    {locations[i]}
                </div>)
            }

            for (var i = 0; i < business_type.length; i++) {
                business_type_doms.push(
                <div className="dropdown-item" key={i}>
                    <input type="checkbox" 
                        key={i} 
                        value={business_type[i]} 
                        checked={this.state.business_type.indexOf(business_type[i]) >= 0} 
                        onChange={this.filter.bind(this, business_type[i], "BUSINESS_TYPE")} />
                    {business_type[i]}
                </div>)
            }
        }

      return (
          <div className='row' id='discover-app'>
            <h1 className='col-10 offset-1'>Discover Opportunities</h1>
            
            
            {/* <Row> */}
              <div className='col-12 col-lg-10 offset-lg-1 wrapper'>

              <Col xs={{span: '12'}}>
                <Row>
                    <InputGroup className="col-12 col-md-6 col-lg-4 offset-lg-2">
                        <FormControl
                        placeholder="Search for businesses"
                        aria-label="Search for businesses"
                        aria-describedby="basic-addon2"
                        onChange={this.handleSearch}
                        />
                    </InputGroup>

                    <Dropdown className='col-12 col-md-3 col-lg-2'>
                        <Dropdown.Toggle id="dropdown-basic" className='col-12 custom-button'>
                            Filter
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Location</Dropdown.Item>
                            {location_doms}
                            <Dropdown.Item href="#">Business Type</Dropdown.Item>
                            {business_type_doms}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className='col-12 col-md-3  col-lg-2'>
                        <Dropdown.Toggle id="dropdown-basic" className='col-12 custom-button'>
                            Sort
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item  onClick={() => this.sort("RETURNS")}>Returns</Dropdown.Item>
                            <Dropdown.Item  onClick={() => this.sort("AMOUNT_RAISED")}>Amount Raised</Dropdown.Item>
                            <Dropdown.Item  onClick={() => this.sort("PRICE_PER_UNIT")}>Price per unit</Dropdown.Item>
                            <Dropdown.Item  onClick={() => this.sort("REQUIRED")}>Capital Required</Dropdown.Item>
                            <Dropdown.Item  onClick={() => this.sort("MATURITY_PERIOD")}>Maturity Period</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Col>
                <div className='opportunities-wrapper row'>
                  {opportunities}
                </div>
              </div>
            {/* </Row> */}
          </div>
      )
    }
  }
  



  export default DiscoverApp;