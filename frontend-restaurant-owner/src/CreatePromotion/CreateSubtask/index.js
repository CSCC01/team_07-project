import React, { Component } from 'react';

import TextPopUp from '../../sharedComponents/TextPopUp';
import SubtaskButtons from './SubtaskButtons';
import PresetTemplates from './PresetTemplates';

class CreateSubtask extends Component {
  state = {
    tasks: [],
    addButton: '',
    deleteAllTasks: '',
  };

  getSelectedTask = (tasks) => {
    this.setState({ tasks });
    this.props.onSelectTask(tasks);
  };

  parentFunction = (addButtonFromChild, deleteAllTasksFromChild) => {
    this.setState({ addButton: addButtonFromChild });
    this.setState({ deleteAllTasks: deleteAllTasksFromChild });
  };

  render() {
    return (
      <div style={{ marginBottom: 10, textAlign: 'center' }}>
        <TextPopUp
          title="Subtask"
          popup="Users can only use one preset. Reselect preset will delete all the existing task."
        />
        <div style={{ textAlign: 'left' }}>
          <SubtaskButtons
            onSelectTask={this.getSelectedTask}
            functionFromParent={this.parentFunction}
          />
          <PresetTemplates
            addButton={this.state.addButton}
            deleteAllTasks={this.state.deleteAllTasks}
          />
        </div>
      </div>
    );
  }
}

export default CreateSubtask;
