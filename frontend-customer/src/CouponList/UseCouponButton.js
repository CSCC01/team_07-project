import React from 'react';
import { Button } from '@material-ui/core';
import styles from './UseCouponButton.module.css';
import axios from 'axios';

export default function UseCouponButton(props) {
    let buttonContent;
    if (props.coupon.status === "available"){
        buttonContent = <div className={styles.available}>use it</div>;
    } else { //props.coupon.status === "used"
        buttonContent = <div className={styles.used}>used</div>;
    }
    
    const sendCouponRequest = () => {
        if (props.coupon.status === "available"){
            axios({
                method: "POST",
                url: "requests",
                data: {
                    "type": "coupon",
                    "coupon_id": props.coupon.id,
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('Authorization-Token'),
                },
            });
        }
    }

    return (
        <>
            <Button onClick={sendCouponRequest}>
                {buttonContent}
            </Button>
        </>
    );
}