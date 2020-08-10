import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {
    state = {
        promotions: []
    }

    async componentDidMount(){
        const promotions = await getPromotions();
        this.setState({
            promotions: promotions,
        })
    }

    get promotionList() {
        if (this.state.promotions.length !== 0){
            return <PromotionList 
                content={this.state.promotions} 
                className="promotion-list"
                />;
        } else {
            return <div style={{marginLeft: 20, marginRight: 20, marginTop: 10, fontSize: '1.2rem'}}>Sorry, We do not have any promotions to show now.</div>;
        }
    }
    
    render(){
        if (localStorage.getItem('Authorization-Token') === null) {
            return <Redirect to="/login" />;
        }
        else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
            return <Redirect to="/validation" />;
        }

        return (
            <>
                <div className='title-bar'>
                    <TitleBar title='Promotion'/>
                </div>
                <div className='mainSection'>
                    <Typography component="h2" className='headline' style={{fontSize: '1.2rem'}}>
                        Promotions Avaliable to You:
                    </Typography>
                    {this.promotionList}
                </div>
            </>
        );
    }
}

export const getPromotions = async () => {
    const currentTime = new Date();
    return await axios.get('/promotions').then((response) =>
        response.data.filter(promotion => new Date(promotion.expired_date) > currentTime))
    .catch(() => []);
};
