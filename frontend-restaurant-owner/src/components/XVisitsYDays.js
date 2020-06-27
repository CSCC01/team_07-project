import React from 'react';

function XVisitsYDays(prop) {
  let visits = prop.visits;
  let days = prop.days;
  let list = [];
  for (let i = 0; i < visits; i++) {
    list.push(<p key={i}>Complete one visit within {days} days.</p>);
  }
  if (visits > 0 && days > 0) {
    return (
      <div>
        <p>
          Task: Get reward by visiting {visits} times within {days} days.
        </p>
        <p>Subtasks: </p>
        <p>{list}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default XVisitsYDays;
