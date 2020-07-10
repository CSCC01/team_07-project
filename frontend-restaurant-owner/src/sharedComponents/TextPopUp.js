import React, { Component } from 'react';

import './TextPopUp.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@material-ui/core/Typography';

class TextPopUp extends Component {
  render() {
    return (
      <div>
        <div className="title-popup-wrapper">
          <p className="title">{this.props.title}</p>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div className="title-popup-button">
                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                  <FontAwesomeIcon icon={faQuestion} />
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                  }}
                >
                  <Box p={2}>
                    <Typography>{this.props.popup}</Typography>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      </div>
    );
  }
}

export default TextPopUp;
