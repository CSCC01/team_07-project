import React from 'react';
import axios from 'axios';
import PromotionListDetail from './PromotionListDetail';

class ViewPromotion extends React.Component {
  state = {
    promotionList: [],
    jwtToken: localStorage.getItem('Authorization-Token'),
  };

  async componentDidMount() {
    getRestaurant(this.state.jwtToken).then((currentRestaurant) => {
      getPromotions(this.state.jwtToken, currentRestaurant.data).then((promotions) => {
        this.setState({
          promotionList: promotions,
        });
      });
    });
  }

  render() {
    if (this.state.promotionList.length === 0) {
      return <p>You have not created any promotion yet! :(</p>;
    } else {
      return <PromotionListDetail data-testid="promoList" promotions={this.state.promotionList} />;
    }
  }
}

export default ViewPromotion;

export const getRestaurant = async (jwtToken) => {
  const restaurant = await axios({
    method: 'GET',
    url: '/users/me',
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
  return restaurant;
};

export const getPromotions = async (jwtToken, restaurant) => {
  var promotionList;
  await axios({
    method: 'GET',
    url: '/promotions',
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  }).then((response) => {
    promotionList = response.data.filter((promotion) => promotion.restaurant.id === restaurant.id);
  });
  return promotionList;
};
