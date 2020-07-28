import React, { Component } from 'react';

import TextPopUp from '../sharedComponents/TextPopUp';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class SelectReward extends Component {
  state = {
    type: null,
    value: null,
    showingModal: false,
  };

  get couponLabel() {
    return (
      'Coupon' +
      (this.state.type === 'coupon' && this.state.value !== null ? ': ' + this.state.value : '')
    );
  }

  get pointsLabel() {
    return this.state.type === 'points' && this.state.value !== null
      ? this.state.value + ' Points'
      : 'Points';
  }

  rewardChange = (event) => {
    this.setState({
      type: event.target.value,
      value: null,
      showingModal: true,
    });
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
          <FormControlLabel
            value="coupon"
            control={
              <Radio
                onClick={() =>
                  this.state.type === 'coupon' && this.setState({ showingModal: true })
                }
              />
            }
            label={this.couponLabel}
          />
          <FormControlLabel
            value="points"
            control={
              <Radio
                onClick={() =>
                  this.state.type === 'points' && this.setState({ showingModal: true })
                }
              />
            }
            label={this.pointsLabel}
          />
        </RadioGroup>
      </div>
    );
  }
}

export default SelectReward;
