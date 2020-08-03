import React, { Component } from 'react';

import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    };
  }

  onVerify = () => {
    this.setState({ status: 1 });
    this.props.onYes();
  };

  render() {
    return (
      <div>
        <Popup
          trigger={
            <div className='verification'>
              <Button variant="contained" color="secondary" disabled={this.state.status}>
                Verify
              </Button>
            </div>
          }
          disabled={this.state.status}
          modal
          closeOnDocumentClick
          contentStyle={{
            width: '70%',
            height: 'fit-content',
            borderRadius: '20px',
            border: '0px',
          }}
        >
          {(close) => (
            <div style={{ margin: 30, textAlign: 'center' }}>
              <IconButton style={{ position: 'absolute', top: 20, right: 20 }} onClick={close}>
                <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 3, marginRight: 3 }} />
              </IconButton>
              <p style={{ fontSize: '1.2em' }}>Are you sure you want to verify?</p>
              <Button variant="contained" color="secondary" onClick={this.onVerify}>
                Yes
              </Button>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}
