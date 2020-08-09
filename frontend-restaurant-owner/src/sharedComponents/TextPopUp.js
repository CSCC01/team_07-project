import React, { Component } from 'react';

import './TextPopUp.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@material-ui/core/Typography';

class TextPopUp extends Component {
  state = { highlight: 0 };
  render() {
    return (
      <div className="title-popup-wrapper">
        <p className="popup-title">{this.props.title}</p>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div
              className={
                this.state.highlight ? 'title-popup-button highlight' : 'title-popup-button'
              }
              onClick={() => this.setState({ highlight: !this.state.highlight })}
            >
              <div className="popup-button" {...bindTrigger(popupState)}>
                <FontAwesomeIcon style={{ marginTop: '5' }} icon={faQuestion} />
              </div>
              <Popover
                style={{ marginTop: 10 }}
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Box p={2} style={{ border: '#000 1.5px solid', borderRadius: 4 }}>
                  <Typography style={{ fontSize: '1em', fontWeight: 600 }}>
                    {this.props.popup}
                  </Typography>
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    );
  }
}

export default TextPopUp;
