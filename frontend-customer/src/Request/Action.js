import React, { Component } from 'react';

import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './index.css';

export default class Action extends Component {

  // This function is called when user clicks on the verify button or the reject button
  onYes = (type) => {
    if (type === "reject") {
      this.props.onYes('/' + type);
    } else {
      this.props.onYes('/verify');
    }
    
  };

  render() {
    return (
      <div>
        <Popup
          trigger={
            <div>
              <Button 
                variant="outlined" 
                color="#000" 
                disabled={this.props.status ? true : false}
                style={this.props.status
                        ? { border: '#9e9e9e 2px solid' }
                        :{ border: '#000 2px solid', backgroundColor: '#FFD564'} }>
                {this.props.type}
              </Button>
            </div>
          }
          disabled={this.props.status ? true : false}
          modal
          closeOnDocumentClick
          contentStyle={{
            width: '70%',
            height: 'fit-content',
            borderRadius: '20px',
            border: '#000 2px solid',
            marginLeft: '16%'
          }}
        >
          {(close) => (
            // The content of the popup
            <div style={{ margin: 20, marginTop: 50, textAlign: 'center' }}>
              {/* The cross button on the top right */}
              <IconButton style={{ position: 'absolute', top: 10, right: 10 }} onClick={close}>
                <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 3, marginRight: 3 }} />
              </IconButton>
              <p style={{ fontSize: '1.2em', marginTop: 10 }}>Are you sure you want to <span className="request-highlight">{this.props.type}</span> this request?</p>
              <Button variant="outlined" color="#000" onClick={()=>this.onYes(this.props.type)} 
              style={{ border: '#000 2px solid', backgroundColor: '#FFD564'}}>
                Yes
              </Button>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}
