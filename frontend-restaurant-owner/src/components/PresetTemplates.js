import React from 'react';
import './PresetTemplates.css';
import NVisit from './NVisit';
import XItems from './XItems';
import XVisitsYDays from './XVisitsYDays';
import XDollars from './XDollars';
import BuyXGetY from './BuyXGetY';

class PresetTemplates extends React.Component {
  constructor() {
    super();
    this.state = {
      hideList: false,
      name: 'container inactive',
      nthVisit: false,
      xItems: false,
      xVisitsYDays: false,
      xDollars: false,
      buyXGetY: false,
      nthVisitInput: 0,
      xItemsAmountInput: 0,
      xItemsNameInput: '',
      xVisitsInput: 0,
      yDaysInput: 0,
      xDollarsInput: 0,
      buyXInput: 0,
      getYInput: 0,
      itemNameBGInput: '',
      displayNVisitSub: false,
      displayXItemsSub: false,
      displayXVisitsYDaysSub: false,
      displayXDollarsSub: false,
      displayBuyXGetYSub: false,
    };

    this.toggleList = this.toggleList.bind(this);

    this.nVisit = this.nVisit.bind(this);
    this.handleNVisitChange = this.handleNVisitChange.bind(this);
    this.finishNVisit = this.finishNVisit.bind(this);

    this.xItems = this.xItems.bind(this);
    this.handleXItemsAmount = this.handleXItemsAmount.bind(this);
    this.handleItemName = this.handleItemName.bind(this);
    this.finishXItems = this.finishXItems.bind(this);

    this.xVisitsYDays = this.xVisitsYDays.bind(this);
    this.handleXVisits = this.handleXVisits.bind(this);
    this.handleYDays = this.handleYDays.bind(this);
    this.finishXVisitsYDays = this.finishXVisitsYDays.bind(this);

    this.xDollars = this.xDollars.bind(this);
    this.handleXDollars = this.handleXDollars.bind(this);
    this.finishXDollars = this.finishXDollars.bind(this);

    this.buyXGetY = this.buyXGetY.bind(this);
    this.handleBuyX = this.handleBuyX.bind(this);
    this.handleGetY = this.handleGetY.bind(this);
    this.handleBGItemName = this.handleBGItemName.bind(this);
    this.finishBuyXGetY = this.finishBuyXGetY.bind(this);
  }

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

  handleNVisitChange(e) {
    this.setState({ nthVisitInput: e.target.value });
  }

  handleXItemsAmount(e) {
    this.setState({ xItemsAmountInput: e.target.value });
  }

  handleItemName(e) {
    this.setState({ xItemsNameInput: e.target.value });
  }

  handleXVisits(e) {
    this.setState({ xVisitsInput: e.target.value });
  }

  handleYDays(e) {
    this.setState({ yDaysInput: e.target.value });
  }

  handleXDollars(e) {
    this.setState({ xDollarsInput: e.target.value });
  }

  handleBuyX(e) {
    this.setState({ buyXInput: e.target.value });
  }

  handleGetY(e) {
    this.setState({ getYInput: e.target.value });
  }

  handleBGItemName(e) {
    this.setState({ itemNameBGInput: e.target.value });
  }

  render() {
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
            <input type="number" onChange={this.handleNVisitChange}></input>
            <button onClick={this.finishNVisit}>Finish</button>
          </div>
        )}

        {this.state.xItems && (
          <div>
            <p>Enter # of items need to be ordered.</p>
            <input type="number" onChange={this.handleXItemsAmount}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleItemName}></input>
            <button onClick={this.finishXItems}>Finish</button>
          </div>
        )}

        {this.state.xVisitsYDays && (
          <div>
            <p>Enter # visits.</p>
            <input type="number" onChange={this.handleXVisits}></input>
            <p>Enter # of days.</p>
            <input type="number" onChange={this.handleYDays}></input>
            <button onClick={this.finishXVisitsYDays}>Finish</button>
          </div>
        )}

        {this.state.xDollars && (
          <div>
            <p>Enter the money need to spend on an order.</p>
            <input type="number" onChange={this.handleXDollars}></input>
            <button onClick={this.finishXDollars}>Finish</button>
          </div>
        )}

        {this.state.buyXGetY && (
          <div>
            <p>Enter # of an item need to buy.</p>
            <input type="number" onChange={this.handleBuyX}></input>
            <p>Enter # of item will get.</p>
            <input type="number" onChange={this.handleGetY}></input>
            <p>Enter the name of item need to be ordered.</p>
            <input type="text" onChange={this.handleBGItemName}></input>
            <button onClick={this.finishBuyXGetY}>Finish</button>
          </div>
        )}

        {this.state.displayNVisitSub === true && <NVisit count={this.state.nthVisitInput} />}
        {this.state.displayXItemsSub === true && (
          <XItems itemCount={this.state.xItemsAmountInput} itemName={this.state.xItemsNameInput} />
        )}
        {this.state.displayXVisitsYDaysSub === true && (
          <XVisitsYDays visits={this.state.xVisitsInput} days={this.state.yDaysInput} />
        )}
        {this.state.displayXDollarsSub === true && <XDollars dollars={this.state.xDollarsInput} />}
        {this.state.displayBuyXGetYSub === true && (
          <BuyXGetY
            buyX={this.state.buyXInput}
            getY={this.state.getYInput}
            itemName={this.state.itemNameBGInput}
          />
        )}
      </div>
    );
  }
}

export default PresetTemplates;
