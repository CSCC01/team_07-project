import React from 'react';
import PromotionBox from './PromotionBox';
import { Container } from '@material-ui/core';
import { List } from '@material-ui/core';

export default function PromotionList(props){
    return (
            <List data-testid="promotion-list">
            {props.content.map(promotion => (
                <PromotionBox content={promotion}/>
            ))}
            </List>
    );
}