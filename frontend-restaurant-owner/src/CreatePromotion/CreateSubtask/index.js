import React, { Component } from 'react';

import TextPopUp from '../../sharedComponents/TextPopUp';
import SubtaskBtns from './SubtaskBtns';
import PresetTemplates from './PresetTemplates';

class CreateSubtask extends Component {
  state = {
    tasks: [],
    addBtn: '',
    deleteAllTasks: '',
  };

  getSelectedTask = (tasks) => {
    this.setState({ tasks });
    this.props.onSelectTask(tasks);
  };

  parentFunction = (addBtnFromChild, deleteAllTasksFromChild) => {
    this.setState({ addBtn: addBtnFromChild });
    this.setState({ deleteAllTasks: deleteAllTasksFromChild });
  };

  render() {
    return (
      <div style={{ marginBottom: 10, textAlign: 'left' }}>
        <TextPopUp
          title="Subtask"
          popup="Users can only use one preset. Reselect preset will delete all the exsting task."
        />
        <SubtaskBtns onSelectTask={this.getSelectedTask} functionFromParent={this.parentFunction} />
        <PresetTemplates addBtn={this.state.addBtn} deleteAllTasks={this.state.deleteAllTasks} />
      </div>
    );
  }
}

export default CreateSubtask;
