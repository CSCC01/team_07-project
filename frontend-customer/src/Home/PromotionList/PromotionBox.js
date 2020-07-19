import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function PromotionBox(props) {
    return (
        <ListItem button component={Link} to={'promotions/' + props.content.id}>
            <ListItemText 
                primary={props.content.title} 
                secondary={"expired date： " + props.content.expired_date}
            />
        </ListItem>
    );
}