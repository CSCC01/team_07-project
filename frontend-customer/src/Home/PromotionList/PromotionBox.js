import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PromotionBox.module.css';
import { Link }  from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function PromotionBox(props) {
    const [status, setStatus] = useState("NA");

    useEffect(() => {
        axios.get('/promotions/' + props.content.id + '/progress', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
            }
        }).then((response) => {
            setStatus(response.data.status);
        });
      }, [props.content.id]);

    return (
        <div className={styles.promotion}>
            {/* status */}
            <div className={styles.statusRowWrapper}>
                <div className={styles.statusWrapper}>
                    <p className={styles.status}>{status === "NA" ? "Not Engaged" : (status === "ongoing" ? "Participated" : "Completed")}</p>
                </div>
            <div></div>
            </div>

            <div className={styles.contentWrapper}>
                {/* Promotion Title */}
                <div>
                    <p className={styles.text}>
                    Promotion Title: <span className={styles.textHighlight}>{props.content.title}</span>
                    </p>
                </div>
                {/* Restaurant Name */}
                <div>
                    <p className={styles.text}>
                    Restaurant Name: <span className={styles.textHighlight}>{props.content.restaurant.name}</span>
                    </p>
                </div>
                {/* Closing Time */}
                <div>
                    <p className={styles.text}>
                    Closing Time: <span className={styles.textHighlight}>{new Date(props.content.expired_date).toLocaleString().split(",")[0]}</span>
                    </p>
                </div>
            </div>
            {/* Button */}
            <div style={{textAlign: 'center'}}>
                <Link to={'promotions/' + props.content.id} style={{textDecoration: 'none'}}>
                    <Button
                        variant="outlined"
                        color="default"
                        style={{ border: '#000 2px solid', backgroundColor: '#FFD564', marginTop: 10, marginRight: 0}}>
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
        );
    }