import React, { Component } from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import './AchievementFlag.css'

class AchievementFlag extends Component {
  state = {
    color: '',
  };

  componentDidMount() {
    if(this.props.number <= 1) {
      this.setState({
        color: '#FFDE03'
      })
    } else if(2 <= this.props.number && this.props.number <= 4) {
      this.setState({
        color: '#0336FF'
      })
    } else if(5 <= this.props.number) {
      this.setState({
        color: '#FF0266'
      })
    }
  }

  render() {
    return (
      <div>
        <div className="title-popup-wrapper">
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div className="title-popup-button">
                <FlagIcon 
                  fontSize="large" 
                  {...bindTrigger(popupState)}
                  style={{ color: this.state.color }}
                />
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
                    <div className='flag-texts'>
                        <p className='flag-text'>{this.props.restaurantName}</p>
                        <p className='flag-text'>Completed {this.props.number} promotions</p>
                    </div>
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
  
export default AchievementFlag;