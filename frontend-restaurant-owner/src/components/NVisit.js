import React from 'react';

function NVisit(prop) {
  let count = prop.count;
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(<p key={i}>Complete one visit.</p>);
  }
  if (count > 0) {
    return (
      <div>
        <p>Task: Get reward at {count}-th visit.</p>
        <p>Subtasks: </p>
        <p>{list}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default NVisit;
