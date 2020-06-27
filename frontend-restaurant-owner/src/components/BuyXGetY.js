import React from 'react';

function BuyXGetY(prop) {
  let buyX = prop.buyX;
  let getY = prop.getY;
  let itemName = prop.itemName;
  let list = [];
  for (let i = 0; i < buyX; i++) {
    list.push(<p key={i}>Buy one {itemName}.</p>);
  }
  if (buyX > 0 && getY > 0) {
    return (
      <div>
        <p>
          Task: Buy {buyX} {itemName} get {getY} {itemName} free.
        </p>
        <p>Subtasks: </p>
        <p>{list}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default BuyXGetY;
