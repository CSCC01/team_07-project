import React from 'react';
import PresetTemplates from './components/PresetTemplates';
import SubtaskBtns from './components/SubtaskBtns';

class CreatePromotion extends React.Component {
  constructor() {
    super();
    this.state = {
      subtask: [],
      taskCount: 0,
    };
  }

  callbackFunction(childSubTask, childTaskCount) {
    this.setState({ subTask: childSubTask });
    this.setState({ subTask: childTaskCount });
  }

  render() {
    return (
      <div>
        <PresetTemplates parentCallback={this.callbackFunction} />
        <p>Subtasks</p>
        <SubtaskBtns subTask={this.state.subTask} taskCount={this.state.taskCount} />
      </div>
    );
  }
}

export default CreatePromotion;
