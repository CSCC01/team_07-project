import React from 'react';

class XDollars extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let dollars = this.props.dollars;
    if (dollars > 0) {
      this.props.addBtn('Get reward for spending ' + dollars + ' dollars on an order.');
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

export default XDollars;
