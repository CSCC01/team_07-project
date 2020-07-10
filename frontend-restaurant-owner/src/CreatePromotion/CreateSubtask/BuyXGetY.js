import React from 'react';

class BuyXGetY extends React.Component {
  addSubtask = () => {
    this.props.deleteAllTasks();
    let buyX = this.props.buyX;
    let getY = this.props.getY;
    let itemName = this.props.itemName;
    if (buyX > 0 && getY > 0) {
      this.props.addBtn(
        'Buy ' + buyX + ' ' + itemName + ' get ' + getY + ' ' + itemName + ' free.',
      );
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

export default BuyXGetY;
