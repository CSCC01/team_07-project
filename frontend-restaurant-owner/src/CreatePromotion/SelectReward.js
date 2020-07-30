import React, { Component } from 'react';

import TextPopUp from '../sharedComponents/TextPopUp';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, Button } from '@material-ui/core';

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

  onContentChange = ({ target: { value } }) => {
    this.setState({ value });
    this.props.onSelectReward({ type: this.state.type, value });
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

        <Dialog
          open={this.state.showingModal}
          onClose={() => this.setState({ showingModal: false })}
        >
          <DialogContent dividers style={{ padding: 30 }}>
            <Typography variant="h6">
              {this.state.type === 'coupon'
                ? 'Please enter the coupon description'
                : 'Please enter number of points'}
            </Typography>
            {this.state.type === 'coupon' ? (
              <TextField
                variant="outlined"
                type="text"
                inputProps={{ size: 40 }}
                value={this.state.value || ''}
                onChange={this.onContentChange}
              />
            ) : this.state.type === 'points' ? (
              <TextField
                variant="outlined"
                type="number"
                inputProps={{ min: 1 }}
                value={this.state.value || ''}
                onChange={this.onContentChange}
              />
            ) : null}
            <div style={{ margin: 5 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ showingModal: false })}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default SelectReward;
