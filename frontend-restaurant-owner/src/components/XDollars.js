import React from 'react';

class XDollars extends React.Component {
  addSubtask = () => {
    let dollars = this.props.dollars;
    if (dollars > 0) {
      this.props.addBtn('Get reward for spending ' + dollars + ' dollars on an order.');
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

export default XDollars;
