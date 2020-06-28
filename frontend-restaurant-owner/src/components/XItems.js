import React from 'react';

class XItems extends React.Component {
  addSubtask = () => {
    let itemCount = this.props.itemCount;
    let itemName = this.props.itemName;
    for (let i = 0; i < itemCount; i++) {
      this.props.addBtn('Buy 1 ' + itemName + '.');
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

export default XItems;
