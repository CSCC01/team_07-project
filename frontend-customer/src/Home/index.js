import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PromotionList from './PromotionList';
import TitleBar from '../sharedComponents/TitleBar';
import './index.css';
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component {
    state = {
        promotionList: [],
        progresses: []
    }

    componentDidMount(){
        getPromotions().then((promotionList)=>{
            this.setState({
                promotionList: promotionList,
            });  
        });
        // console.log("AAAA"+participateInPromotion(5));
    }
    
    render(){
        if (localStorage.getItem('Authorization-Token') === null) {
            return <Redirect to="/login" />;
        }
        else if (localStorage.getItem('role').localeCompare("Restaurant Staff") === 0) {
            return <Redirect to="/coupon-validation" />;
        }

        let promotionList;
        if (this.state.promotionList.length !== 0){
            promotionList = <PromotionList content={this.state.promotionList} progress={this.state.progresses} className="promotion-list"/>;
        } else {
            promotionList = <div>Sorry, We do not have any promotions to show now.</div>
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

// export const participateInPromotion = async (promotionId) => {
//     return await axios.get('/promotions/'+ promotionId+ '/progress').then(response => {
//         console.log(response);
//     }).catch(() => []);
// };