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
        <div className={styles.subItem}>
          {props.promotion.image.map((pic) => (
            <img
              src={'http://localhost:1337' + pic}
              alt="promotion img"
              width="500"
              heigh="500"
            ></img>
          ))}
        </div>

        <div className={styles.subItem}>
          <h3>Description: {props.promotion.description}</h3>
          <p>Starting Date: {props.promotion.starting_date}</p>
          <p>Expired Date: {props.promotion.expired_date}</p>
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
