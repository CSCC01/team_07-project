import React from 'react';
import './PromotionItem.css';
import PromotionItem from './PromotionItem';

function PromotionListDetail(props) {
  if (Object.keys(props.promotions).length > 0) {
    return (
      <div className="container">
        {props.promotions &&
          props.promotions.map((promotion) => (
            <PromotionItem key={promotion.id} promotion={promotion} />
          ))}
      </div>
    );
  } else {
    return (
      <p style={{ fontSize: '1.5rem', marginTop: 100 }}>
        You have not created any promotion yet! :(
      </p>
    );
  }
}

export default PromotionListDetail;
