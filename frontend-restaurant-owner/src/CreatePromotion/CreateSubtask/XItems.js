import React from 'react';

class XItems extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let itemCount = this.props.itemCount;
    let itemName = this.props.itemName;
    for (let i = 0; i < itemCount; i++) {
      this.props.addBtn('Buy 1 ' + itemName + '.');
    }
    this.props.hideAndClear();
  };

  render() {
    return (
      <div>
        <button onClick={this.addSubtask}>Finish</button>
      </div>
    );
  }
}

export default XItems;
