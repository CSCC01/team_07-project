import React, { Component } from 'react';

import TextPopUp from './TextPopUp';
import PromotionTime from './PromotionTime';

import '../CreatePromotion.css';

class DateInput extends Component {
  state = {
    startTime: '',
    closeTime: '',
  };

  getSelectedStartTime = (startTime) => {
    this.setState({ startTime });
    this.props.onSelectStartTime(startTime);
  };

  getSelectedCloseTime = (closeTime) => {
    this.setState({ closeTime });
    this.props.onSelectCloseTime(closeTime);
  };

  render() {
    return (
      <div className="margin-bottom align">
        <TextPopUp title="Date" popup="Empty" />
        <PromotionTime
          onSelectStartTime={this.getSelectedStartTime}
          onSelectCloseTime={this.getSelectedCloseTime}
        />
      </div>
    );
  }
}

export default DateInput;
