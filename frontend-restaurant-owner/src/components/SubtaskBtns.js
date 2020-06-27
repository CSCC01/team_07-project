import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Popover from '@material-ui/core/Popover';

export default class SubtaskBtns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskNum: 1,
      taskDecscription: [],
    };
  }

  addBtn() {
    const temp = this.state.taskDecscription;
    temp[this.state.taskNum - 1] = '';
    this.setState((state) => ({
      taskNum: state.taskNum + 1,
      taskDecscription: temp,
    }));
  }

  render() {
    let btns = [];
    for (let i = 1; i < this.state.taskNum; i++)
      btns.push(<Button onclick={() => this.popupSubtask()}>{i}</Button>);

    return (
      <ButtonGroup>
        {btns}
        <Button onClick={() => this.addBtn()}>+</Button>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          The content of the Popover.
        </Popover>
      </ButtonGroup>
    );
  }
}
