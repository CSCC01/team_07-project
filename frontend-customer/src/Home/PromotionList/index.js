import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function PromotionList(props){
    return (
            <List data-testid="promotion-list">
            {props.content.map(promotion => 
                <PromotionBox content={promotion}/>
            )}
            </List>
    );
}

function PromotionBox(props) {
    return (
        <ListItem button component={Link} to={'promotions/' + props.content.id} data-testid = "promotion-box">
            <ListItemText
                primary={props.content.title} 
                secondary={"Closing Time： " + new Date(props.content.expired_date).toLocaleString()}
            />
        </ListItem>
    );
}