import React from 'react';
import { TextField, Dialog, DialogContent, Button } from '@material-ui/core';
import styles from './PresetTemplates.module.css';

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

  onPresetComplete = (type = '') => {
    if (!['items', 'dollars', 'visits'].includes(type)) console.error('Unexpected type: ' + type);

    this.props.deleteAllTasks();
    switch (type) {
      case 'items':
        for (let i = 0; i < this.state.x; i++)
          this.props.addButton(`Buy 1 ${this.state.itemName}.`);
        break;

      case 'dollars':
        this.props.addButton(`Get reward for spending ${this.state.x} dollars on an order.`);
        break;

      case 'visits':
        for (let i = 0; i < this.state.x; i++) this.props.addButton('Complete one visit.');
        break;

      default:
        throw new Error('Unreachable');
    }
    this.hideAndClear();
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

        <Dialog open={this.state.selectedTemplate !== 0} onClose={this.hideAndClear}>
          <DialogContent dividers>
            {this.state.selectedTemplate === 1 && (
              <div>
                <p>Enter number of visits</p>
                <TextField
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 1, max: 20 }}
                  onChange={this.handleXChange}
                />
                <SubmitButton onClick={() => this.onPresetComplete('visits')} />
              </div>
            )}

            {this.state.selectedTemplate === 2 && (
              <div>
                <p>Enter number of items need to be ordered.</p>
                <TextField
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 1, max: 20 }}
                  onChange={this.handleXChange}
                />
                <p>Enter the name of item need to be ordered.</p>
                <TextField type="text" onChange={this.handleItemNameChange} />
                <SubmitButton onClick={() => this.onPresetComplete('items')} />
              </div>
            )}

            {this.state.selectedTemplate === 3 && (
              <div>
                <p>Enter the money need to spend on an order.</p>
                <TextField
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 1, max: 300 }}
                  onChange={this.handleXChange}
                />
                <SubmitButton onClick={() => this.onPresetComplete('dollars')} />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default PresetTemplates;

function SubmitButton({ onClick }) {
  return (
    <div>
      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={onClick}>
        Finish
      </Button>
    </div>
  );
}
