import React from 'react';
import './PresetTemplates.css';
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
      hideList: false,
      name: 'container inactive',
      nthVisit: false,
      xItems: false,
      xVisitsYDays: false,
      xDollars: false,
      buyXGetY: false,
      x: 0,
      y: 0,
      n: 0,
      itemName: '',
      displayNVisitSub: false,
      displayXItemsSub: false,
      displayXVisitsYDaysSub: false,
      displayXDollarsSub: false,
      displayBuyXGetYSub: false,
    };

    this.toggleList = this.toggleList.bind(this);
    this.handleXChange = this.handleXChange.bind(this);
    this.handleYChange = this.handleYChange.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);

    this.nVisit = this.nVisit.bind(this);
    this.finishNVisit = this.finishNVisit.bind(this);

    this.xItems = this.xItems.bind(this);
    this.finishXItems = this.finishXItems.bind(this);

    this.xVisitsYDays = this.xVisitsYDays.bind(this);
    this.finishXVisitsYDays = this.finishXVisitsYDays.bind(this);

    this.xDollars = this.xDollars.bind(this);
    this.finishXDollars = this.finishXDollars.bind(this);

    this.buyXGetY = this.buyXGetY.bind(this);
    this.finishBuyXGetY = this.finishBuyXGetY.bind(this);
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
    if (this.state.hideList) {
      this.setState({ name: 'container inactive' });
    } else {
      this.setState({ name: 'container' });
    }
  }

  hideForms() {
    this.setState({ nthVisit: false });
    this.setState({ xItems: false });
    this.setState({ xVisitsYDays: false });
    this.setState({ xDollars: false });
    this.setState({ buyXGetY: false });
  }

  hideTask() {
    this.setState({ displayNVisitSub: false });
    this.setState({ displayXItemsSub: false });
    this.setState({ displayXVisitsYDaysSub: false });
    this.setState({ displayXDollarsSub: false });
    this.setState({ displayXVisitsYDaysSub: false });
  }

  // clearInputs() {
  //   this.setState({ x: 0 });
  //   this.setState({ y: 0 });
  //   this.setState({ itemName: '' });
  // }

  nVisit() {
    this.toggleList();
    this.setState({ nthVisit: true });
  }

  xItems() {
    this.toggleList();
    this.setState({ xItems: true });
  }

  xVisitsYDays() {
    this.toggleList();
    this.setState({ xVisitsYDays: true });
  }

  xDollars() {
    this.toggleList();
    this.setState({ xDollars: true });
  }

  buyXGetY() {
    this.toggleList();
    this.setState({ buyXGetY: true });
  }

  finishNVisit() {
    this.setState({ displayNVisitSub: true });
    this.setState({ nthVisit: false });
  }

  finishXItems() {
    this.setState({ displayXItemsSub: true });
    this.setState({ xItems: false });
  }

  finishXVisitsYDays() {
    this.setState({ displayXVisitsYDaysSub: true });
    this.setState({ xVisitsYDays: false });
  }

  finishXDollars() {
    this.setState({ displayXDollarsSub: true });
    this.setState({ xDollars: false });
  }

  finishBuyXGetY() {
    this.setState({ displayBuyXGetYSub: true });
    this.setState({ buyXGetY: false });
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
          className="btn"
          onClick={() => {
            this.toggleList();
            this.hideForms();
            this.hideTask();
          }}
        >
          PRESET TEMPLATES
        </button>

        <div className={this.state.name}>
          <div className="item" onClick={this.nVisit}>
            N-th Visit
          </div>
          <div className="item" onClick={this.xItems}>
            Order X Specific Items
          </div>
          <div className="item" onClick={this.xVisitsYDays}>
            Visit X Times Within Y Days
          </div>
          <div className="item" onClick={this.xDollars}>
            Spend X Dollars in an Order
          </div>
          <div className="item" onClick={this.buyXGetY}>
            Buy X Get Y Free
          </div>
        </div>

        {this.state.nthVisit && (
          <div>
            <p>Enter # of visits</p>
            <input type="number" onChange={this.handleXChange}></input>
            <button onClick={this.finishNVisit}>Finish</button>
          </div>
        )}

        {this.state.xItems && (
          <div>
            <p>Enter # of items need to be ordered.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleItemNameChange}></input>
            <button onClick={this.finishXItems}>Finish</button>
          </div>
        )}

        {this.state.xVisitsYDays && (
          <div>
            <p>Enter # visits.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter # of days.</p>
            <input type="number" onChange={this.handleYChange}></input>
            <button onClick={this.finishXVisitsYDays}>Finish</button>
          </div>
        )}

        {this.state.xDollars && (
          <div>
            <p>Enter the money need to spend on an order.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <button onClick={this.finishXDollars}>Finish</button>
          </div>
        )}

        {this.state.buyXGetY && (
          <div>
            <p>Enter # of an item need to buy.</p>
            <input type="number" onChange={this.handleXChange}></input>
            <p>Enter # of item will get.</p>
            <input type="number" onChange={this.handleYChange}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleItemNameChange}></input>
            <button onClick={this.finishBuyXGetY}>Finish</button>
          </div>
        )}

        {/* {this.state.displayNVisitSub === true && (
          <NVisit count={this.state.handleXChange} parentCallback={this.callbackFunction} />
        )} */}
        {this.state.displayNVisitSub && <NVisit count={this.state.x} />}

        {this.state.displayXItemsSub && (
          <XItems itemCount={this.state.x} itemName={this.state.itemName} />
        )}

        {this.state.displayXVisitsYDaysSub && (
          <XVisitsYDays visits={this.state.x} days={this.state.y} />
        )}
        {this.state.displayXDollarsSub && <XDollars dollars={this.state.x} />}
        {this.state.displayBuyXGetYSub && (
          <BuyXGetY buyX={this.state.x} getY={this.state.y} itemName={this.state.itemName} />
        )}
      </div>
    );
  }
}

export default PresetTemplates;
