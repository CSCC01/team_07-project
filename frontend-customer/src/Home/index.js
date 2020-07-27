import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';

export default class Home extends React.Component {
    state = {
        promotionList: []
    }

    componentDidMount(){
        axios.get('/promotions').then((response) => {
            const currentTime = new Date();
            const promotionList = response.data.filter(
                promotion => new Date(promotion.expired_date) > currentTime);
            this.setState({
                promotionList: promotionList,
            });
        })
        .catch((error) => {
            console.log(error.response);
        });
    }
    
    render(){
        return (
            <>
                <div data-testid='title'>
                    <TitleBar title='Home'/>
                </div>
                <div className='mainSection'>
                    <Typography component="h2" className='headline'>
                        Promotions Avaliable to You:
                    </Typography>
                    <hr />
                    <PromotionList content={this.state.promotionList}/>
                </div>
            </>
        );
    }
}