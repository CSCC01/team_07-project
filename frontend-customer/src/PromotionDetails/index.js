import React from 'react';

export default class PromotionDetails{
    constructor(props){
        super(props);

        state = {
            id = -1,
            title = "",
            description = "",
            images = [],
            starting_date = "",
            expired_date = "",
            subtasks = []
        };
    }
}