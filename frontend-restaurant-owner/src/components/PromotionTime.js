import React from 'react';
import TextField from '@material-ui/core/TextField';

export default class PromotionTime extends React.Component {
  state = {
    startTime: '',
    closeTime: '',
  };

  changeStartTime(e) {
    this.setState({
      startTime: e.target.value,
    });
    this.props.onSelectStartTime(e.target.value);
  }

  changeCloseTime(e) {
    this.setState({
      closeTime: e.target.value,
    });
    this.props.onSelectCloseTime(e.target.value);
  }

  render() {
    return (
      <div>
        <form noValidate>
          <TextField
            id="datetime-local"
            label="starting time"
            type="datetime-local"
            defaultValue="2020-01-01T00:00"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => this.changeStartTime(e)}
          />
          <br />
          <TextField
            id="datetime-local"
            label="closing time"
            type="datetime-local"
            defaultValue="2020-01-01T00:00"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => this.changeCloseTime(e)}
          />
        </form>
      </div>
    );
  }
}
