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
      displayTask: 0,
      x: 0,
      y: 0,
      n: 0,
      itemName: '',
    };

    this.toggleList = this.toggleList.bind(this);
    this.hideForms = this.hideForms.bind(this);
    this.hideTask = this.hideTask.bind(this);
    this.handleXChange = this.handleXChange.bind(this);
    this.handleYChange = this.handleYChange.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
  }

  // sendData(subTask) {
  //   this.props.callbackFunction(subTask);
  // }

  // generateList(count) {
  //   let subTask = [];
  //   for (let i = 0; i < count; i++) {
  //     subTask.push('Complete one visit.');
  //   }
  //   return subTask;
  // }

  toggleList() {
    this.setState((prevState) => {
      return { hideList: !prevState.hideList };
    });
  }

  hideForms() {
    this.setState({ selectedTemplate: 0 });
  }

  hideTask() {
    this.setState({ displayTask: 0 });
  }

  handleXChange(e) {
    this.setState({ x: e.target.value });
  }

  handleYChange(e) {
    this.setState({ y: e.target.value });
  }

  handleItemNameChange(e) {
    this.setState({ itemName: e.target.value });
  }

  render() {
    // if (this.state.displayXItemsSub) {
    //   this.sendData(this.generateList(this.state.nthVisitInput), this.state.xVisitsInput);
    // }
    return (
      <div>
        <button
          className={styles.btn}
          onClick={() => {
            this.toggleList();
            this.hideForms();
            this.hideTask();
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
            <button
              onClick={() => {
                this.setState({ displayTask: 1 });
                this.hideForms();
              }}
            >
              Finish
            </button>
          </div>
        )}

        {this.state.selectedTemplate === 2 && (
          <div>
            <p>Enter # of items need to be ordered.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleItemNameChange}></input>
            <button
              onClick={() => {
                this.setState({ displayTask: 2 });
                this.hideForms();
              }}
            >
              Finish
            </button>
          </div>
        )}

        {this.state.selectedTemplate === 3 && (
          <div>
            <p>Enter # visits.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter # of days.</p>
            <input type="number" onChange={this.handleYChange}></input>
            <button
              onClick={() => {
                this.setState({ displayTask: 3 });
                this.hideForms();
              }}
            >
              Finish
            </button>
          </div>
        )}

        {this.state.selectedTemplate === 4 && (
          <div>
            <p>Enter the money need to spend on an order.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <button
              onClick={() => {
                this.setState({ displayTask: 4 });
                this.hideForms();
              }}
            >
              Finish
            </button>
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
            <button
              onClick={() => {
                this.setState({ displayTask: 5 });
                this.hideForms();
              }}
            >
              Finish
            </button>
          </div>
        )}

        {/* {this.state.displayNVisitSub === true && (
          <NVisit count={this.state.handleXChange} parentCallback={this.callbackFunction} />
        )} */}
        {this.state.displayTask === 1 && <NVisit count={this.state.x} />}

        {this.state.displayTask === 2 && (
          <XItems itemCount={this.state.x} itemName={this.state.itemName} />
        )}

        {this.state.displayTask === 3 && <XVisitsYDays visits={this.state.x} days={this.state.y} />}
        {this.state.displayTask === 4 && <XDollars dollars={this.state.x} />}
        {this.state.displayTask === 5 && (
          <BuyXGetY buyX={this.state.x} getY={this.state.y} itemName={this.state.itemName} />
        )}
      </div>
    );
  }
}

export default PresetTemplates;
