import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Grid, Box } from '@material-ui/core';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';

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
            <div>
                <TitleBar title='Home' />
                <div className='mainSection'>
                    <Typography component="h2" className='headline'>
                        Promotions Avaliable to You:
                    </Typography>
                    <hr />
                    <PromotionList content={this.state.promotionList}/>
                </div>
            </div>
        );
    }
}