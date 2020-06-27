import React from 'react';

function XDollars(prop) {
  let dollars = prop.dollars;
  if (dollars > 0) {
    return (
      <div>
        <p>Task: Get reward for spending {dollars} dollars on an order.</p>
        <p>Subtask: Get reward for spending {dollars} dollars on an order.</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default XDollars;
