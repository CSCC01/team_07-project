import React, { Component } from 'react';

import TextPopUp from './TextPopUp';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class SelectReward extends Component {
  state = {
    reward: -1,
  };

  rewardChange = (event) => {
    this.setState({
      reward: event.target.value,
    });
    this.props.onSelectReward(event.target.value);
  };

  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        <TextPopUp title="Reward" popup="Coupon and points are unavailable right now" />

        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={this.state.reward}
          onChange={this.rewardChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="Coupon" />
          <FormControlLabel value="1" control={<Radio />} label="Point" />
        </RadioGroup>
      </div>
    );
  }
}

export default SelectReward;
