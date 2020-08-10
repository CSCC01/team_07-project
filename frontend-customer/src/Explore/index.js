import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import TitleBar from '../sharedComponents/TitleBar';
import AchievementFlag from './AchievementFlag';

class Explore extends Component {
  static defaultProps = {
    center: {
      lat: 43.78,
      lng: -79.18
    },
    zoom: 12
  };

  state = {
    flagList: [],
    jwtToken: localStorage.getItem('Authorization-Token'),
    username: localStorage.getItem('name'),
  };

  async componentDidMount() {
    const achievements = await getAchievements(this.state.jwtToken, this.state.username);
    this.setState({
      flagList: achievements,
    });
  }

  render() {
    if (localStorage.getItem('Authorization-Token') === null) {
      return <Redirect to="/login" />;
  }
  else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
      return <Redirect to="/validation" />;
  }
    return (
      <>
        <div data-testid='title'>
                <TitleBar title='Explore Toronto'/>
        </div>
        <div style={{ height: '94vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyD8GuDI-NCQS6y62ArnFzqoxfKFZLMzCjM"}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {
              this.state.flagList.map((flag) => (
                <AchievementFlag 
                  lat={flag.restaurant.location.lat}
                  lng={flag.restaurant.location.lng}
                  restaurantName={flag.restaurant.name}
                  number={flag.complete_number}
                />
              ))}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default Explore;

export const getAchievements = async (jwtToken, username) => {
  const response = await axios({
    method: 'GET',
    url: '/achievements',
    params: {
      'user.username': username,
    },
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
  return response.data;
};