import React, { Component } from 'react';

import './index.css';
import Verification from './Verification';

export default class Message extends Component {
  state = {
    userName: 'Katrina',
    promotionName: 'visit the store 5 times',
    subtaskName: 'Visit once',
    messageId: generateRandomNumber(),
    status: 0, // 0 - unconfirmed; 1 - confirmed
  };

  onYes = () => {
    this.setState({ status: 1 });
  };

  render() {
    return (
      <div className="dashboard">
        <div className="card-wrapper">
          <div className="status-id-wrapper">
            <div className="status-wrapper">
              <p className="status">{this.state.status ? 'confirmed' : 'unconfirmed'}</p>
            </div>
            <div className="message-id-wrapper">
              <p className="message-id">#{this.state.messageId}</p>
            </div>
          </div>

          <div className="message-wrapper">
            <div>
              <p className="message">
                User Name: <span className="message-highlight">{this.state.userName}</span>
              </p>
            </div>
            <div>
              <p className="message">
                Promotion: <span className="message-highlight">{this.state.promotionName}</span>
              </p>
            </div>
            <div>
              <p className="message">
                Subtask: <span className="message-highlight">{this.state.subtaskName}</span>
              </p>
            </div>
          </div>

          <div className="button-row-wrapper">
            <Verification onYes={() => this.onYes()} customerName={this.state.userName} />
          </div>
        </div>
      </div>
    );
  }
}

export const generateRandomNumber = () => {
  let randomNumber = Math.floor(Math.random() * 1000) + 1;
  return randomNumber;
};
