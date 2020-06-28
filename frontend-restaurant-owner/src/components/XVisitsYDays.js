import React from 'react';

class XVisitsYDays extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let visits = this.props.visits;
    let days = this.props.days;
    for (let i = 0; i < visits; i++) {
      this.props.addBtn('Complete one visit within ' + days + ' days.');
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

export default XVisitsYDays;
