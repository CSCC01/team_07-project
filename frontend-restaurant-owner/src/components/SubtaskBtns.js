import React from 'react';
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default class SubtaskBtns extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    taskNum: 1,
    taskDecscription: [],
    dialogOpen: []
    };
  }

  addBtn(){
    let taskDecscription = this.state.taskDecscription;
    taskDecscription.push("");
    let dialogOpen = this.state.dialogOpen;
    dialogOpen.push(false);
    this.setState((state) => ({
      taskNum: state.taskNum + 1,
      taskDecscription: taskDecscription,
      dialogOpen: dialogOpen,
    }));
  }

  deleteTask(i){
    const taskDecscription = this.state.taskDecscription;
    taskDecscription.splice(i, 1);
    const dialogOpen = this.state.dialogOpen;
    dialogOpen.splice(i, 1);
    this.setState((state) => ({
      taskNum: state.taskNum - 1,
      taskDecscription: taskDecscription,
      dialogOpen:dialogOpen,
    }));
  }

  openDialog(i){
    let dialogOpen = this.state.dialogOpen;
    dialogOpen[i] = true;
    this.setState({
      dialogOpen: dialogOpen,
    });
  }

  closeDialog(i){
    let dialogOpen = this.state.dialogOpen;
    dialogOpen[i] = false;
    this.setState({
      dialogOpen: dialogOpen,
    });
  }

  editDialog(i, e) {
    let taskDecscription = this.state.taskDecscription;
    taskDecscription[i] = e.target.value;
    this.setState({taskDecscription: taskDecscription});
  }

  render(){
    let btns = [];
    for (let i=1; i < this.state.taskNum; i++) {
      btns.push(
     <SubBtn num={i} 
     description={this.state.taskDecscription[i-1]} 
     openDialog={()=>this.openDialog(i-1)} 
     closeDialog={()=>this.closeDialog(i-1)}
     editDialog= {(e)=>this.editDialog(i-1, e)}
     deleteTask={()=>this.deleteTask(i-1)}
     isOpen={this.state.dialogOpen[i-1]}/>
     );
    }   

    return (
    <ButtonGroup>
      {btns}
      <Button onClick={() => this.addBtn()}>+</Button>
    </ButtonGroup>
  );
  }
}

function SubBtn(props) {
  return (
    <div>
    <Button onClick={props.openDialog}>{props.num}</Button>
    <Dialog onClose={props.closeDialog} aria-labelledby="customized-dialog-title" open={props.isOpen}>
      <DialogTitle id="customized-dialog-title">
        Subtask {props.num}
      </DialogTitle>
      <DialogContent dividers>
        <TextareaAutosize aria-label="empty textarea" placeholder="Empty" rowsMin="5" value={props.description} onChange={props.editDialog}/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.closeDialog} color="primary">
          Save
        </Button>
        <Button autoFocus onClick={props.deleteTask} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}