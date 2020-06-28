import React from 'react';
import PresetTemplates from './components/PresetTemplates';
import SubtaskBtns from './components/SubtaskBtns';
import PromotionTime from './components/PromotionTime';

class CreatePromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addBtn: '' };
  }

  parentFunction = (addBtnFromChild) => {
    this.setState({ addBtn: addBtnFromChild });
  };

  render() {
    return (
      <div>
        <PresetTemplates addBtn={this.state.addBtn} />
        <p>Subtasks</p>
        <SubtaskBtns functionFromParent={this.parentFunction} />
        <PromotionTime />
      </div>
    );
  }
}

export default CreatePromotion;
