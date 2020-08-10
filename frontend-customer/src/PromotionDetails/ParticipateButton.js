import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import styles from './ParticipateButton.module.css';

export default function ParticipateButton () {
    const handleClick = () => {

    }
    
    return (<div className={styles.participateButton}>
        <Button onClick={handleClick}>Participate!</Button>
        </div>);
}