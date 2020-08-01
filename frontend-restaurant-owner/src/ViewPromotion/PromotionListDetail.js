import React from 'react';
import styles from './PromotionListDetail.module.css';

function PromotionListDetail(props) {
  return (
    <div className={styles.container}>
      {props.promotions.map((promotion) => (
        <PromotionItem promotion={promotion} />
      ))}
    </div>
  );
}

function PromotionItem(props) {
  return (
    <div className={styles.item}>
      <h1>Title: {props.promotion.title} </h1>

      <div className={styles.subContainer}>
        <div style={{ display: 'flex', flexFlow: 'column' }}>
          {props.promotion.image.map((pic) => (
            <img
              src={'http://localhost:1337' + pic}
              alt="promotion img"
              style={{ maxWidth: 500, maxHeight: 500 }}
            ></img>
          ))}
        </div>

        <div style={{ width: 500, paddingLeft: 50 }}>
          <h3>Description: {props.promotion.description}</h3>
          <p>Starting Date: {new Date(props.promotion.starting_date).toLocaleString()}</p>
          <p>Expired Date: {new Date(props.promotion.expired_date).toLocaleString()}</p>
          <p>Subtasks:</p>
          <il>
            {props.promotion.subtask.map((sub) => (
              <li>{sub}</li>
            ))}
          </il>
        </div>
      </div>
    </div>
  );
}

export default PromotionListDetail;
