import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PromotionBox.module.css';
import { Link }  from 'react-router-dom';

export default function PromotionBox(props) {
    const [status, setStatus] = useState("NA");
    
    useEffect(() => {
        inProgress().then(status => {
            setStatus(status);
        }).catch(() => {});
      }, []);

    const inProgress = async () => {
        const progress = await axios.get('/promotions/' + props.content.id + '/progress', {
            headers: {
            Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
            }
          })
        return progress.data.status;
    }

    return (
        <div className={styles.promotion}>
        <Link to={'promotions/' + props.content.id}>
                <div className={styles.headline}>
                    <div className={styles.title}>{props.content.title}</div>
                    {status === "ongoing" && <div className={styles.status}>Participated</div>}
                    {status === "completed" && <div className={styles.status}>Completed</div>}
                </div>
                <div className={styles.restaurant}>{props.content.restaurant.name}</div>
                <div className={styles.time}>{"Closing Time： " + new Date(props.content.expired_date).toLocaleString()}</div>
        </Link>
        </div>
        );
    }