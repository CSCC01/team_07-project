import React from 'react';

export default class PromotionDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: -1,
            title: "",
            description: "",
            images: [],
            starting_date: "",
            expired_date: "",
            subtasks: []
        };
    }
}