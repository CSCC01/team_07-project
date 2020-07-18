import React from 'react';
import { Button } from '@material-ui/core';

class NVisit extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let count = this.props.count;
    for (let i = 0; i < count; i++) {
      this.props.addButton('Complete one visit.');
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

export default NVisit;
