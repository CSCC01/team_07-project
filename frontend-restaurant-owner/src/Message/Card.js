import React, { Component } from 'react';

import './index.css';
import Verification from './Verification.js';

import axios from 'axios';

export default class Card extends Component {
  state = {
    status: 0, // 0 - unconfirmed; 1 - confirmed
  };

  onYes = () => {
    this.setState({ status: 1 });
    let url = '/processes/' + this.props.id;
    this.props.message.status = 'confirmed';
    let data = this.props.message;
    updateStatus(url, data);
  };

  render() {
    return (
      <div className="card-wrapper">
        <div className="status-id-wrapper">
          <div className="status-wrapper">
            <p className="status">{this.state.status ? 'confirmed' : 'unconfirmed'}</p>
          </div>
          <div className="message-id-wrapper">
            <p className="message-id">#{this.props.messageId}</p>
          </div>
        </div>

        <div className="message-wrapper">
          <div>
            <p className="message">
              User Name: <span className="message-highlight">{this.props.userName}</span>
            </p>
          </div>
          <div>
            <p className="message">
              Promotion: <span className="message-highlight">{this.props.promotionName}</span>
            </p>
          </div>
          <div>
            <p className="message">
              Subtask: <span className="message-highlight">{this.props.subtaskName}</span>
            </p>
          </div>
        </div>

        <div className="button-row-wrapper">
          <Verification onYes={() => this.onYes()} />
        </div>
      </div>
    );
  }
}

export const updateStatus = async (url, data) => {
  await axios({
    method: 'PUT',
    url: url,
    data,
  })
    .then((response) => {
      // console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
