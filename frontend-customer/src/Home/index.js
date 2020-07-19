import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Grid, Box } from '@material-ui/core';
import PromotionList from './PromotionList';

export default class Home extends React.Component {
    state = {
        promotionList: []
    }

    componentDidMount(){
        axios
        .get('http://localhost:3008/promotions')
        .then((response) => {
            this.setState({
                promotionList: response.data,
            });
        })
        .catch((error) => {
            console.log(error.response);
        })
    }
    
    render(){
        return (
            <Container>
                <Typography component="h2">
                    Promotions Avaliable to You:
                </Typography>
                <PromotionList content={this.state.promotionList} />
            </Container>
        );
    }
}