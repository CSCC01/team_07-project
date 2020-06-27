import React, { Component } from 'react';

import TextPopUp from './TextPopUp';

import '../CreatePromotion.css';

import TextField from '@material-ui/core/TextField';

class DescriptionInput extends Component {
  state = {
    description: '',
  };

  descriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
    this.props.onSelectDescription(event.target.value);
  };

  render() {
    return (
      <div className="margin-bottom">
        <TextPopUp title="Description" popup="No character limitation" />
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          onChange={this.descriptionChange}
          inputProps={{
            maxLength: 300,
          }}
        />
      </div>
    );
  }
}

export default DescriptionInput;
