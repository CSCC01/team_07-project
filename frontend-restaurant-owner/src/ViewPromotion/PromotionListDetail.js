import React from 'react';
import styles from './PromotionListDetail.module.css';
import SlideView from './SlideView';

function PromotionListDetail(props) {
  if (Object.keys(props.promotions).length > 0) {
    return (
      <div className="has-promo-list" className={styles.container}>
        {props.promotions &&
          props.promotions.map((promotion) => (
            <PromotionItem key={promotion.id} promotion={promotion} />
          ))}
      </div>
    );
  } else {
    return <p className="no-promo-list">You have not created any promotion yet! :(</p>;
  }
}

function PromotionItem(props) {
  return (
    <div className={styles.item}>
      <h1>Title: {props.promotion.title} </h1>

      <div className={styles.subContainer}>
        <SlideView images={props.promotion.image} />

        <div style={{ width: 500, paddingLeft: 50 }}>
          <h3>Description: {props.promotion.description}</h3>
          <p>Starting Date: {new Date(props.promotion.starting_date).toLocaleString()}</p>
          <p>Expired Date: {new Date(props.promotion.expired_date).toLocaleString()}</p>
          <p>Subtasks:</p>
          <ul>
            {props.promotion &&
              props.promotion.subtask.map((sub, index) => <li key={index}>{sub}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PromotionListDetail;
