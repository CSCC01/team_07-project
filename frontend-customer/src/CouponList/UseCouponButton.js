import React from 'react';
import { Button } from '@material-ui/core';
import styles from './UseCouponButton.module.css';

export default function UseCouponButton(props) {
    const buttonContent = props.isAvailable ? <div className={styles.available}>use it</div> : <div className={styles.used}>used</div>;
    return (
        <>
            <Button>
                {buttonContent}
            </Button>
        </>
    );
}