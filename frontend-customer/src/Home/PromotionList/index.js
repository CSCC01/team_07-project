import React from 'react';
import PromotionBox from './PromotionBox';
import styles from './PromotionBox.module.css';

export default function PromotionList(props){
    return (
            <div data-testid="promotion-list" className={styles.container}>
            {props.content.map(promotion => 
                <PromotionBox content={promotion} />
            )}
            </div>
    );
}
