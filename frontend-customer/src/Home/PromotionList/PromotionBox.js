import React from 'react';
import styles from './PromotionBox.module.css';
import { Link }  from 'react-router-dom';

export default function PromotionBox(props) {
    return (
        <div className={styles.promotion}>
        <Link to={'promotions/' + props.content.id}>
                <div className={styles.headline}>
                    <div className={styles.title}>{props.content.title}</div>
                    {props.inProgress && <div className={styles.status}>Participated</div>}
                </div>
                <div className={styles.restaurant}>{props.content.restaurant.name}</div>
                <div className={styles.time}>{"Closing Time： " + new Date(props.content.expired_date).toLocaleString()}</div>
        </Link>
        </div>
        );
    }