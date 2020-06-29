import React from 'react';
import PresetTemplates from './components/PresetTemplates';
import SubtaskBtns from './components/SubtaskBtns';
import PromotionTime from './components/PromotionTime';

class CreatePromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addBtn: '', deleteAllTasks: '' };
  }

  parentFunction = (addBtnFromChild, deleteAllTasksFromChild) => {
    this.setState({ addBtn: addBtnFromChild });
    this.setState({ deleteAllTasks: deleteAllTasksFromChild });
  };

  render() {
    return (
      <div>
        <PresetTemplates addBtn={this.state.addBtn} deleteAllTasks={this.state.deleteAllTasks} />
        <p>Subtasks</p>
        <SubtaskBtns functionFromParent={this.parentFunction} />
        <PromotionTime />
      </div>
    );
  }
}

export default CreatePromotion;
