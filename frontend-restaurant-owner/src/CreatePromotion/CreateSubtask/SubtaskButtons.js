import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '85%',
    padding: 0,
    marginTop: 20,
    marginBottom: 20,
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
      <>
        <ButtonGroup>
          {buttons}
          <Button
            onClick={() => this.addButton('')}
            style={{ border: '#000 2px solid', backgroundColor: '#FFD564' }}
          >
            +
          </Button>
        </ButtonGroup>
      </>
    );
  }
}

function SubButton(props) {
  const classes = useStyles();
  return (
    <div>
      <Button
        onClick={props.openDialog}
        style={
          props.num === 1
            ? {
                borderBottomRightRadius: '0',
                borderTopRightRadius: '0',
                border: '#000 2px solid',
                backgroundColor: '#FFD564',
                borderRight: '#000 0px solid',
              }
            : {
                borderRadius: '0',
                border: '#000 2px solid',
                backgroundColor: '#FFD564',
                borderRight: '#000 0px solid',
              }
        }
      >
        {props.num}
      </Button>
      <Dialog
        onClose={props.closeDialog}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
        maxWidth="xs"
        fullWidth="true"
      >
        <DialogContent
          style={{
            textAlign: 'center',
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
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
            Please enter the description for Subtask {props.num}
          </p>
          <textarea
            rows="5"
            cols="30"
            className="subtask-not-focus"
            onChange={props.editDialog}
            maxLength="500"
            value={props.description}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            autoFocus
            onClick={props.closeDialog}
            color="#000"
            variant="outlined"
            style={{
              border: '#000 2px solid',
              backgroundColor: '#FFD564',
            }}
          >
            Save
          </Button>
          <Button
            autoFocus
            onClick={props.deleteTask}
            color="#000"
            variant="outlined"
            style={{
              border: '#000 2px solid',
              backgroundColor: '#FFD564',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
