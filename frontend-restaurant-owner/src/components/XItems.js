import React from 'react';

function XItems(prop) {
  let itemCount = prop.itemCount;
  let itemName = prop.itemName;
  let list = [];
  for (let i = 0; i < itemCount; i++) {
    list.push(<p key={i}>Buy 1 {itemName}.</p>);
  }
  if (itemCount > 0) {
    return (
      <div>
        <p>
          Task: Get reward for buying {itemCount} {itemName}s{' '}
        </p>
        <p>Subtasks: </p>
        <p>{list}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default XItems;
