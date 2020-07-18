import React from 'react';
import { Button } from '@material-ui/core';

class XDollars extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let dollars = this.props.dollars;
    if (dollars > 0) {
      this.props.addButton('Get reward for spending ' + dollars + ' dollars on an order.');
    }
    this.props.hideAndClear();
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.addSubtask}>
          Finish
        </Button>
      </div>
    );
  }
}

export default XDollars;
