import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';

const jwt_token = localStorage.getItem('Authorization-Token');

export default class Home extends React.Component {
    state = {
        promotionList: [],
    }

    componentDidMount(){
        getPromotions(jwt_token).then((promotionList)=>{
            console.log(promotionList);
            this.setState({
                promotionList: promotionList,
            });  
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

export const getPromotions = async (jwt_token) => {
    const currentTime = new Date();
    return await axios.get('/promotions', {
        headers: {
            Authorization: 'Bearer ' + jwt_token,
        }
    }).then((response) =>
    response.data.filter(promotion => new Date(promotion.expired_date) > currentTime)
    ).catch((error) => {
        console.log(error.response);
    });
};