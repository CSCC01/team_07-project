import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {
    state = {
        promotions: [],
        progresses: []
    }

    async componentDidMount(){
        const promotions = await getPromotions();
        const progresses = await getUserProgresses();
        this.setState({
            promotions: promotions,
            progresses: progresses,
        })
    }

    get promotionList() {
        if (this.state.promotions.length !== 0){
            return <PromotionList 
                content={this.state.promotions} 
                progresses={this.state.progresses} 
                className="promotion-list"
                />;
        } else {
            return <div>Sorry, We do not have any promotions to show now.</div>;
        }
    }
    
    render(){
        if (localStorage.getItem('Authorization-Token') === null) {
            return <Redirect to="/login" />;
        }
        else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
            return <Redirect to="/coupon-validation" />;
        }

        return (
            <>
                <div className='title-bar'>
                    <TitleBar title='Promotion'/>
                </div>
                <div className='mainSection'>
                    <Typography component="h2" className='headline'>
                        Promotions Avaliable to You:
                    </Typography>
                    <hr />
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

export const getUserProgresses = async () => {
    const user = await axios.get('/users/me', {
        headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
      },
    });
    return await axios.get('/progresses?user.id=' + await user.data.id)
    .then((reponse) => reponse.data)
    .catch(() => []);
}
