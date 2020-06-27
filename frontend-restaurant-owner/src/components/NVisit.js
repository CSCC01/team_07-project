import React from 'react';

// function sendData(prop, subTask) {
//   this.prop.parentCallback(subTask);
// }

function NVisit(prop) {
  let count = prop.count;
  let list = [];
  // let subTask = [];
  for (let i = 0; i < count; i++) {
    list.push(<p key={i}>Complete one visit.</p>);
    // subTask.push('Complete one visit.');
  }

  // sendData(prop, subTask);

  if (count > 0) {
    return (
      <div>
        <p>Task: Get reward at {count}-th visit.</p>
        <p>Subtasks: </p>
        <p>{list}</p>
      </div>
    );
  } else {
    return <p></p>;
  }
}

export default NVisit;
