import React from 'react';
import styles from './Coupon.module.css';
import UseCouponButton from './UseCouponButton.js'

export default function Coupon (props) {
    return (
        <div className={styles.coupon}>
            <div>
                <div className={styles.description}>
                    {props.coupon.description}
                </div>
                <div>
                    {props.coupon.restaurant.name}
                </div>
            </div>
            <UseCouponButton coupon={props.coupon} isAvailable={true} />
        </div>
    );
}