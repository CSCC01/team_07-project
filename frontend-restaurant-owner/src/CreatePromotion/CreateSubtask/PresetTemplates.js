import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  dialogActions: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    width: '85%',
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
  },
});

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

  handleClick = (selectedIndex) => {
    this.setState({ selectedTemplate: selectedIndex });
    this.toggleList();
  };

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
        <SplitButton
          handleClick={(selectedIndex) => {
            this.handleClick(selectedIndex);
          }}
        />

        {this.state.selectedTemplate === 1 && (
          <TemplateDialog
            open={this.state.selectedTemplate === 1}
            onClose={this.hideAndClear}
            prompt="Enter number of visits"
            onChange={this.handleXChange}
            onClick={() => this.onPresetComplete('visits')}
            maxLength="2"
            items="false"
          ></TemplateDialog>
        )}

        {this.state.selectedTemplate === 2 && (
          <TemplateDialog
            open={this.state.selectedTemplate === 2}
            onClose={this.hideAndClear}
            prompt="Enter number of items need to be ordered."
            prompt2="Enter the name of item need to be ordered."
            onChange={this.handleXChange}
            onChange2={this.handleItemNameChange}
            onClick={() => this.onPresetComplete('items')}
            maxLength="2"
            maxLength2="20"
            items="true"
          ></TemplateDialog>
        )}

        {this.state.selectedTemplate === 3 && (
          <TemplateDialog
            open={this.state.selectedTemplate === 3}
            onClose={this.hideAndClear}
            prompt="Enter the money need to spend on an order."
            onChange={this.handleXChange}
            onClick={() => this.onPresetComplete('dollars')}
            maxLength="3"
            items="false"
          ></TemplateDialog>
        )}
      </div>
    );
  }
}

export default PresetTemplates;

function SplitButton(props) {
  const options = [
    'Preset Templates',
    'N-th Visit',
    'Order X Specific Items',
    'Spend X Dollars in an Order',
  ];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    props.handleClick(selectedIndex);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="left" style={{ marginTop: 15 }}>
      <Grid item xs={12}>
        {/* Template selection button */}
        <ButtonGroup variant="outlined" color="#000" ref={anchorRef} aria-label="split button">
          <Button
            onClick={handleClick}
            style={
              open
                ? {
                    border: '#000 2px solid',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 0,
                    backgroundColor: '#FFD564',
                    width: 200,
                  }
                : {
                    border: '#000 2px solid',
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    backgroundColor: '#FFD564',
                    width: 200,
                  }
            }
          >
            {options[selectedIndex]}
          </Button>
          <Button
            color="#000"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            style={
              open
                ? {
                    border: '#000 2px solid',
                    borderLeft: '#000 1px solid',
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 0,
                    backgroundColor: '#FFD564',
                  }
                : {
                    border: '#000 2px solid',
                    borderLeft: '#000 1px solid',
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor: '#FFD564',
                  }
            }
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </Button>
        </ButtonGroup>

        {/* Drop down */}
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="split-button-menu"
                    style={{
                      backgroundColor: '#FFD564',
                      width: 235,
                      border: '#000 2px solid',
                      borderTop: '#000 0px solid',
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      marginLeft: 2,
                    }}
                  >
                    {options.slice(1).map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index + 1 === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index + 1)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

function TemplateDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="customized-dialog-title">
        <DialogContent
          style={{
            textAlign: 'center',
            padding: 0,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <p
            style={{
              fontSize: '1.2em',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {props.prompt}
          </p>
          <input
            type="text"
            className="visits-not-focus"
            onChange={props.onChange}
            maxLength={props.maxLength}
          />
          {props.items === 'true' && (
            <>
              <p
                style={{
                  fontSize: '1.2em',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginBottom: 20,
                }}
              >
                {props.prompt2}
              </p>
              <input
                type="text"
                className="visits-not-focus"
                onChange={props.onChange2}
                maxLength={props.maxLength2}
                style={{ width: '60%' }}
              />{' '}
            </>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            autoFocus
            onClick={props.onClick}
            color="#000"
            variant="outlined"
            style={{
              border: '#000 2px solid',
              backgroundColor: '#FFD564',
            }}
          >
            Finish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
