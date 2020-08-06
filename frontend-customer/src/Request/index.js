import React, { Component } from 'react';

import './index.css';
import Card from './Card';

import axios from 'axios';

export default class Message extends Component {
  state = { messages: [] };

  async componentDidMount() {
    let jwt_token = localStorage.getItem('Authorization-Token');
    let restaurant = await getRestaurant('/users/me/', jwt_token);
    let restaurant_id = restaurant[0];

    let messages = await getMessage(jwt_token, '/requests', restaurant_id);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="dashboard">
        {this.state.messages.map((message) => (
          <Card
            userName={message.user.username}
            promotionName={message.promotion_title}
            subtaskName={message.subtask_content}
            messageId={message.code}
            id={message.id}
            message={message}
            time={message.time}
            key={message.id}
            data-testid="card"
          />
        ))}
      </div>
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

export const getMessage = async (jwt_token, url, restaurant_id) => {
  let messages = [];
  await axios({
    method: 'GET',
    url: url,
    headers: {
      Authorization: 'Bearer ' + jwt_token,
    },
  })
    .then((response) => {
      response.data.forEach((message) => {
        if (message.restaurant.id === restaurant_id && message.status === 'pending') {
          messages.push(message);
        }
      });
    })
    .catch((error) => {
      messages = [-1];
    });
    console.log(messages);
  return messages;
};
