import React, { Component } from 'react';

import TextPopUp from './TextPopUp';
import SubtaskBtns from './SubtaskBtns';

import '../CreatePromotion.css';

class CreateSubtask extends Component {
  state = {
    tasks: [],
  };

  getSelectedTask = (tasks) => {
    this.setState({ tasks });
    this.props.onSelectTask(tasks);
  };

  render() {
    return (
      <div className="margin-bottom align">
        <TextPopUp title="Subtask" popup="Empty" />
        <SubtaskBtns onSelectTask={this.getSelectedTask} />
      </div>
    );
  }
}

export default CreateSubtask;
