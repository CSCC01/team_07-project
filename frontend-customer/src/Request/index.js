import React, { Component } from 'react';

import './index.css';
import Card from './Card';

import axios from 'axios';

export default class Request extends Component {
  state = { requests: [] };

  async componentDidMount() {
    let jwt_token = localStorage.getItem('Authorization-Token');
    let requests = await getRequest(jwt_token, '/requests');
    this.setState({ requests });
  }

  render() {
    return (
      <div className="dashboard">
        {this.state.requests.map((request) => (
          <Card
            userName={request.user.username}
            description={request.description}
            requestCode={generateRandomNumber(request.id)}
            requestType={request.type}
            requestStatus={request.status}
            requestId={request.id}
            key={request.id}
            data-testid="card"
          />
        ))}
      </div>
    );
  }
}

// This function get the requests relevant to the current restaurant
export const getRequest = async (jwt_token, url) => {
  let requests = [];
  await axios({
    method: 'GET',
    url: url,
    headers: {
      Authorization: 'Bearer ' + jwt_token,
    },
  })
    .then((response) => {
      console.log(response.data);
      requests = response.data;
    })
    .catch(() => {
      requests = [-1];
    });
  return requests;
};

// This function generates a random number to be the verification code
export const generateRandomNumber = (id) => {
  let randomNumber = 3**15*id;
  let lastFourDigit = randomNumber %10000
  return lastFourDigit;
};
