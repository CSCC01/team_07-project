import React from 'react';
import PresetTemplates from './components/PresetTemplates';
import SubtaskBtns from './components/SubtaskBtns';
import PromotionTime from './components/PromotionTime';

function CreatePromotion() {
  return (
    <div>
      <PresetTemplates />
      <p>Subtasks</p>
      <SubtaskBtns />
      <PromotionTime />
    </div>
  );
}

export default CreatePromotion;
