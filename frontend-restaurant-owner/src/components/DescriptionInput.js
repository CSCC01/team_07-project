import React, { Component } from 'react';

import TextPopUp from './TextPopUp';

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
      <div style={{ marginBottom: 10 }}>
        <TextPopUp title="Description" popup="Limitation: 500 characters" />
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          onChange={this.descriptionChange}
          inputProps={{
            maxLength: 500,
          }}
        />
      </div>
    );
  }
}

export default DescriptionInput;
