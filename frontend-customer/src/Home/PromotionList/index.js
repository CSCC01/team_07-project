import React from 'react';
import PromotionBox from './PromotionBox';

export default function PromotionList(props){
    return (
            <div data-testid="promotion-list">
            {props.content.map(promotion => 
                <PromotionBox content={promotion} />
            )}
            </div>
    );
}
