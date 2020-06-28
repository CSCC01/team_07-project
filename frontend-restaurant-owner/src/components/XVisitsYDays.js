import React from 'react';

class XVisitsYDays extends React.Component {
  addSubtask = () => {
    let visits = this.props.visits;
    let days = this.props.days;
    for (let i = 0; i < visits; i++) {
      this.props.addBtn('Complete one visit within ' + days + ' days.');
    }
    this.props.hideForms();
    this.props.clearInputs();
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
