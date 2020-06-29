import React from 'react';
import styles from './PresetTemplates.module.css';
import NVisit from './NVisit';
import XItems from './XItems';
import XDollars from './XDollars';

class PresetTemplates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideList: true,
      selectedTemplate: 0,
      x: 0,
      itemName: '',
    };
  }

  toggleList = () => {
    this.setState((prevState) => {
      return { hideList: !prevState.hideList };
    });
  };

  hideForms = () => {
    this.setState({ selectedTemplate: 0 });
  };

  clearInputs = () => {
    this.setState({ x: 0 });
    this.setState({ itemName: '' });
  };

  hideAndClear = () => {
    this.hideForms();
    this.clearInputs();
  };

  handleXChange = (e) => {
    this.setState({ x: e.target.value });
  };

  handleItemNameChange = (e) => {
    this.setState({ itemName: e.target.value });
  };

  render() {
    return (
      <div>
        <button
          className={styles.btn}
          onClick={() => {
            this.toggleList();
            this.hideForms();
          }}
        >
          PRESET TEMPLATES
        </button>

        <div className={this.state.hideList ? styles.inactive : styles.container}>
          <p
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 1 });
              this.toggleList();
            }}
          >
            N-th Visit
          </p>
          <p
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 2 });
              this.toggleList();
            }}
          >
            Order X Specific Items
          </p>
          <p
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 3 });
              this.toggleList();
            }}
          >
            Spend X Dollars in an Order
          </p>
        </div>

        {this.state.selectedTemplate === 1 && (
          <div>
            <p>Enter # of visits</p>
            <input type="number" onChange={this.handleXChange}></input>
            <NVisit
              addBtn={this.props.addBtn}
              deleteAllTasks={this.props.deleteAllTasks}
              count={this.state.x}
              hideAndClear={this.hideAndClear}
            />
          </div>
        )}

        {this.state.selectedTemplate === 2 && (
          <div>
            <p>Enter # of items need to be ordered.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleItemNameChange}></input>
            <XItems
              addBtn={this.props.addBtn}
              deleteAllTasks={this.props.deleteAllTasks}
              itemCount={this.state.x}
              itemName={this.state.itemName}
              hideAndClear={this.hideAndClear}
            />
          </div>
        )}

        {this.state.selectedTemplate === 3 && (
          <div>
            <p>Enter the money need to spend on an order.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <XDollars
              addBtn={this.props.addBtn}
              deleteAllTasks={this.props.deleteAllTasks}
              dollars={this.state.x}
              hideAndClear={this.hideAndClear}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PresetTemplates;
