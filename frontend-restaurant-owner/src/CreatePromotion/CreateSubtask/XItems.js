import React from 'react';
import { Button } from '@material-ui/core';

class XItems extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let itemCount = this.props.itemCount;
    let itemName = this.props.itemName;
    for (let i = 0; i < itemCount; i++) {
      this.props.addButton('Buy 1 ' + itemName + '.');
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

export default XItems;
