import React from 'react';
import styles from './PresetTemplates.module.css';
import NVisit from './NVisit';
import XItems from './XItems';
import XVisitsYDays from './XVisitsYDays';
import XDollars from './XDollars';
import BuyXGetY from './BuyXGetY';

class PresetTemplates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTask: [],
      hideList: true,
      selectedTemplate: 0,
      x: 0,
      y: 0,
      n: 0,
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
    this.setState({ y: 0 });
    this.setState({ itemName: '' });
  };

  handleXChange = (e) => {
    this.setState({ x: e.target.value });
  };

  handleYChange = (e) => {
    this.setState({ y: e.target.value });
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
            // this.hideTask();
          }}
        >
          PRESET TEMPLATES
        </button>

        <div className={this.state.hideList ? styles.inactive : styles.container}>
          <div
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 1 });
              this.toggleList();
            }}
          >
            N-th Visit
          </div>
          <div
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 2 });
              this.toggleList();
            }}
          >
            Order X Specific Items
          </div>
          <div
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 3 });
              this.toggleList();
            }}
          >
            Visit X Times Within Y Days
          </div>
          <div
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 4 });
              this.toggleList();
            }}
          >
            Spend X Dollars in an Order
          </div>
          <div
            className={styles.item}
            onClick={() => {
              this.setState({ selectedTemplate: 5 });
              this.toggleList();
            }}
          >
            Buy X Get Y Free
          </div>
        </div>

        {this.state.selectedTemplate === 1 && (
          <div>
            <p>Enter # of visits</p>
            <input type="number" onChange={this.handleXChange}></input>
            <NVisit
              addBtn={this.props.addBtn}
              count={this.state.x}
              hideForms={this.hideForms}
              clearInputs={this.clearInputs}
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
              itemCount={this.state.x}
              itemName={this.state.itemName}
              hideForms={this.hideForms}
              clearInputs={this.clearInputs}
            />
          </div>
        )}

        {this.state.selectedTemplate === 3 && (
          <div>
            <p>Enter # visits.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter # of days.</p>
            <input type="number" onChange={this.handleYChange}></input>
            <XVisitsYDays
              addBtn={this.props.addBtn}
              visits={this.state.x}
              days={this.state.y}
              hideForms={this.hideForms}
              clearInputs={this.clearInputs}
            />
          </div>
        )}

        {this.state.selectedTemplate === 4 && (
          <div>
            <p>Enter the money need to spend on an order.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <XDollars
              addBtn={this.props.addBtn}
              dollars={this.state.x}
              hideForms={this.hideForms}
              clearInputs={this.clearInputs}
            />
          </div>
        )}

        {this.state.selectedTemplate === 5 && (
          <div>
            <p>Enter # of an item need to buy.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter # of item will get.</p>
            <input type="number" onChange={this.handleYChange}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleItemNameChange}></input>
            <BuyXGetY
              addBtn={this.props.addBtn}
              buyX={this.state.x}
              getY={this.state.y}
              itemName={this.state.itemName}
              hideForms={this.hideForms}
              clearInputs={this.clearInputs}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PresetTemplates;
