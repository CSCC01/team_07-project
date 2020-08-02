import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';

export default class Home extends React.Component {
    state = {
        promotionList: [],
    }

    componentDidMount(){
        getPromotions().then((promotionList)=>{
            this.setState({
                promotionList: promotionList,
            });  
        });
    }
    
    render(){
        let promotionList;
        if (this.state.promotionList.length !== 0){
            promotionList = <PromotionList content={this.state.promotionList}/>;
        } else {
            promotionList = <div>Sorry, We do not have any promotions to show now.</div>
        }
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
                    {promotionList}
                </div>
            </>
        );
    }
}

export const getPromotions = async () => {
    const currentTime = new Date();
    return await axios.get('/promotions').then((response) =>
        response.data.filter(promotion => new Date(promotion.expired_date) > currentTime)
    ).catch(() => []);
};