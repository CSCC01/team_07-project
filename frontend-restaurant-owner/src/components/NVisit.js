import React from 'react';

class NVisit extends React.Component {
  addSubtask = () => {
    let count = this.props.count;
    for (let i = 0; i < count; i++) {
      this.props.addBtn('Complete one visit.');
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

export default NVisit;
