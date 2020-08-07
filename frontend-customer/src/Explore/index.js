import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import TitleBar from '../sharedComponents/TitleBar';

class Explore extends Component {
  static defaultProps = {
    center: {
      lat: 43.78,
      lng: -79.18
    },
    zoom: 15
  };

  render() {
    if (localStorage.getItem('Authorization-Token') === null) {
      return <Redirect to="/login" />;
  }
  else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
      return <Redirect to="/coupon-validation" />;
  }
    return (
      <>
        <div data-testid='title'>
                <TitleBar title='Coupon Validation'/>
        </div>
        <div style={{ height: '94vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyD8GuDI-NCQS6y62ArnFzqoxfKFZLMzCjM"}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Explore;