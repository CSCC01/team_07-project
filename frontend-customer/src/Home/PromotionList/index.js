import React from 'react';
import PromotionBox from './PromotionBox';

export default function PromotionList(props){
    const inProgress = (promotion) => {
        for (let i=0; i<props.progresses.length; i++) {
            const currentProgress = props.progresses[i];
            if (currentProgress.promotion.id === promotion.id) {
                return currentProgress.status === 'ongoing';
            }
        }
        return false;
    }

    return (
            <div data-testid="promotion-list">
            {props.content.map(promotion => 
                <PromotionBox content={promotion} inProgress={inProgress(promotion)} />
            )}
            </div>
    );
}
