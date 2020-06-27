import React from 'react';
import PresetTemplates from './components/PresetTemplates';
import SubtaskBtns from './components/SubtaskBtns';

function CreatePromotion() {
  return (
    <div>
      <p>Subtasks</p>
      <SubtaskBtns />
      <PresetTemplates />
    </div>
  );
}

export default CreatePromotion;
