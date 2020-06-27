import React, { Component } from 'react';

import TextPopUp from './TextPopUp';

import '../CreatePromotion.css';

import TextField from '@material-ui/core/TextField';

class TitleInput extends Component {
  state = {
    title: '',
  };

  titleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    this.props.onSelectTitle(event.target.value);
  };

  render() {
    return (
      <div className="margin-bottom">
        <TextPopUp title="Title" popup="Limitation: 30 characters" />
        <TextField
          variant="outlined"
          fullWidth
          onChange={this.titleChange}
          inputProps={{
            maxLength: 30,
          }}
        />
      </div>
    );
  }
}

export default TitleInput;
