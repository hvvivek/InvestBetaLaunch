import React, {Component} from 'react';
import {Button, Col} from 'react-bootstrap';
import Opportunity from './opportunity';
import axios from 'axios';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.downloadData = this.downloadData.bind(this)
    this.state = {title: this.props.title, text: this.props.text, link: this.props.link, data:[]}
  }

  componentDidMount()
    {
        this.downloadData()
    }

    
    downloadData()
    {
        axios.get('https://invest-beta.herokuapp.com/business/opportunities',{ crossDomain: true })
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

  render() {
    let opportunities = []
    for(var i=0; i<this.state.data.length; i++)
      {
        opportunities.push(
            // <Col xs={{span:12}} sm={{span:6}} lg={{span:3}} key={i}>
                <Opportunity value={this.state.data[i]} key={i}></Opportunity>
            // </Col>
        )
      }
    return (
        <div className='container-fluid' id='discover'>
            <h3 className='col-10 offset-1'>Discover</h3>
            <div className='row wrapper'>
              <div className='container opportunities-wrapper'>
              <Button className='next'><i className="fas fa-chevron-right"></i></Button>
                {opportunities}
                <div className='row see-all-link'>
                <a href="/discover" className='col-12'>SEE ALL OPPORTUNITIES <i className="fas fa-chevron-right"></i></a>
              </div>
              </div>
              
            </div>
        </div>
    )
  }
}

export default Discover;