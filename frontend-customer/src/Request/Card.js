import React, { Component } from 'react';

import './index.css';
import Action from './Action.js';

import axios from 'axios';

export default class Card extends Component {
  state={
    status: 'pending'
  }

  // This function is called when user clicks on the verify button or the reject button
  onYes = async (type) => {
    let jwt_token = localStorage.getItem('Authorization-Token');
    let url = '/requests/' + this.props.requestId + type;
    let output = await updateStatus(url, jwt_token);
    if (output === 200) {
      if (type === '/verify') {
        this.setState({status: 'comfirmed'});
      } else {
        this.setState({status: 'rejected'});
      }
    }

  };

  render() {
    return (
      <div className="card-wrapper">
        {/* status and verification code */}
        <div className="status-id-wrapper">
          <div className="status-wrapper">
            <p className="status">{this.state.status}</p>
          </div>
          <div className="request-id-wrapper">
            <p className="request-id">#{this.props.requestCode}</p>
          </div>
        </div>

        {/* request's content */}
        <div className="request-wrapper">
          <div>
            <p className="request">
              User Name: <span className="request-highlight">{this.props.userName}</span>
            </p>
          </div>
          <div>
            <p className="request">
              Type: <span className="request-highlight">{this.props.requestType}</span>
            </p>
          </div>
          <div>
            <p className="request">
              Description: <span className="request-highlight">{this.props.description}</span>
            </p>
          </div>
        </div>

        {/* verify button and reject button */}
        <div className="button-row-wrapper">
          <Action onYes={this.onYes} type="reject" status={this.state.status === 'pending' ? 0 : 1} />
          <Action onYes={this.onYes} type="verify" status={this.state.status === 'pending' ? 0 : 1}/>
        </div>
      </div>
    );
  }
}

// This function updates the status of the request
export const updateStatus = async (url, jwt_token) => {
  let output;
  await axios({
    method: 'POST',
    url: url,
    headers: {
      Authorization: 'Bearer ' + jwt_token,
    },
  })
    .then((response) => {
      output = response.status;
      // console.log(output); // for debug
    })
    .catch((error) => {
      // console.log(error); // for debug
    });
  return output;
};

