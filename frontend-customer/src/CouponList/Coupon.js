import React from 'react';
import styles from './Coupon.module.css';
import UseCouponButton from './UseCouponButton.js'

export default function Coupon (props) {
    return (
        <div className={styles.coupon}>
            <div className={styles.contentWrapper}>
                {/* Restaurant Name */}
                <div>
                    <p className={styles.text}>
                    Restaurant Name: <span className={styles.textHighlight}>{props.coupon.restaurant.name}</span>
                    </p>
                </div>
                {/* Coupon Content */}
                <div>
                    <p className={styles.text}>
                    Coupon Content: <span className={styles.textHighlight}>{props.coupon.description}</span>
                    </p>
                </div>
            </div>
            {/* Button */}
            <div style={{textAlign: 'center', marginTop: 15, marginBottom: 5}}>
                <UseCouponButton coupon={props.coupon} isAvailable={true}/>
            </div>
        </div>
    );
}