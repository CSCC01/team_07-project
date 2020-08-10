import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBarUpdated.css';
import axios from 'axios';
import Logout from '../Home/Logout';

export default class Navbar extends Component {
  state = { name: '' };

  async componentDidMount() {
    let jwt_token = localStorage.getItem('Authorization-Token');
    let restaurant = await getRestaurant('/users/me/', jwt_token);
    let restaurant_id = restaurant[0];
    let name_list = await getRestaurantName('/restaurants', restaurant_id, jwt_token);
    let name = name_list[0];
    this.setState({ name });
  }

  render() {
    return (
      <nav className="nav-wrapper">
        <div style={{ display: 'flex' }}>
          <div className="nav-link">
            <NavLink to="/" className="nav-link-white" exact={true}>
              Home
            </NavLink>
          </div>
          <div className="nav-link">
            <NavLink to="/create-promotion" className="nav-link-white">
              Create Promotion
            </NavLink>
          </div>
        </div>

        <div className="nav-link" style={{ display: 'flex' }}>
          <div className="nav-link-white">
            <p style={{ margin: 0 }}>Hello, {this.state.name}</p>
          </div>
          <div className="nav-link-white">
            <Logout />
          </div>
        </div>
      </nav>
    );
  }
}

export const getRestaurant = async (url, jwt_token) => {
  let restaurant_id;
  await axios({
    method: 'GET',
    url: url,
    headers: {
      Authorization: 'Bearer ' + jwt_token,
    },
  })
    .then((response) => {
      restaurant_id = [response.data.restaurant, response.status];
    })
    .catch(() => {
      restaurant_id = [-1, -1];
    });
  return restaurant_id;
};

export const getRestaurantName = async (url, id, jwt_token) => {
  let restaurant_name;
  await axios({
    method: 'GET',
    url: url + '/' + id,
    headers: {
      Authorization: 'Bearer ' + jwt_token,
    },
  })
    .then((response) => {
      restaurant_name = [response.data.name, response.status];
    })
    .catch(() => {});
  return restaurant_name;
};
