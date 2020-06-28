import React from 'react';

// function sendData(prop, subTask) {
//   this.prop.parentCallback(subTask);
// }

function NVisit(props) {
  let count = props.count;
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
        <button onClick={props.addBtn}>Click me</button>
        <p>
          Tasknum: {props.taskNum} test: {props.test}
        </p>
      </div>
    );
  } else {
    return <p></p>;
  }
}

export default NVisit;
