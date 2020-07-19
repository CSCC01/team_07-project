import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default class SubtaskButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskNum: 1,
      taskDescription: [],
      dialogOpen: [],
    };
    this.childFunction();
  }

  addButton = (desc) => {
    let taskDescription = this.state.taskDescription;
    taskDescription.push(desc);
    let dialogOpen = this.state.dialogOpen;
    dialogOpen.push(false);
    this.setState((state) => ({
      taskNum: state.taskNum + 1,
      taskDescription: taskDescription,
      dialogOpen: dialogOpen,
    }));
    this.props.onSelectTask(taskDescription);
  };

  deleteTask = (i) => {
    const taskDescription = this.state.taskDescription;
    taskDescription.splice(i, 1);
    const dialogOpen = this.state.dialogOpen;
    dialogOpen.splice(i, 1);
    this.setState((state) => ({
      taskNum: state.taskNum - 1,
      taskDescription: taskDescription,
      dialogOpen: dialogOpen,
    }));
    this.props.onSelectTask(taskDescription);
  };

  deleteAllTasks = () => {
    let totalTask = this.state.taskNum;
    for (let i = 1; i < totalTask; i++) {
      this.deleteTask(0);
    }
  };

  openDialog = (i) => {
    let dialogOpen = this.state.dialogOpen;
    dialogOpen[i] = true;
    this.setState({
      dialogOpen: dialogOpen,
    });
  };

  closeDialog = (i) => {
    let dialogOpen = this.state.dialogOpen;
    dialogOpen[i] = false;
    this.setState({
      dialogOpen: dialogOpen,
    });
  };

  editDialog = (i, e) => {
    let taskDescription = this.state.taskDescription;
    taskDescription[i] = e.target.value;
    this.setState({ taskDescription: taskDescription });
    this.props.onSelectTask(taskDescription);
  };

  childFunction = () => {
    this.props.functionFromParent(this.addButton, this.deleteAllTasks);
  };

  render() {
    let buttons = [];
    for (let i = 1; i < this.state.taskNum; i++) {
      buttons.push(
        <SubButton
          key={i}
          num={i}
          description={this.state.taskDescription[i - 1]}
          openDialog={() => this.openDialog(i - 1)}
          closeDialog={() => this.closeDialog(i - 1)}
          editDialog={(e) => this.editDialog(i - 1, e)}
          deleteTask={() => this.deleteTask(i - 1)}
          isOpen={this.state.dialogOpen[i - 1]}
        />,
      );
    }

    return (
      <ButtonGroup>
        {buttons}
        <Button onClick={() => this.addButton('')}>+</Button>
      </ButtonGroup>
    );
  }
}

function SubButton(props) {
  const classes = useStyles();
  return (
    <div>
      <Button onClick={props.openDialog}>{props.num}</Button>
      <Dialog
        onClose={props.closeDialog}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
      >
        <DialogTitle id="customized-dialog-title">Subtask {props.num}</DialogTitle>
        <DialogContent dividers>
          <TextField
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Empty"
            rows={4}
            multiline
            value={props.description}
            onChange={props.editDialog}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button autoFocus onClick={props.closeDialog} color="primary">
            Save
          </Button>
          <Button autoFocus onClick={props.deleteTask} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
