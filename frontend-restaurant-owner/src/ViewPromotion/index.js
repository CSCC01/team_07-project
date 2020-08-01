import React from 'react';
import axios from 'axios';
import PromotionListDetail from './PromotionListDetail';

class ViewPromotion extends React.Component {
  state = {
    promotionList: [],
    currentRestaurant: '',
  };

  async componentDidMount() {
    await axios({
      method: 'GET',
      url: '/users/me',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
      },
    }).then((response) => {
      const userRes = response.data;
      this.setState({ currentRestaurant: userRes.restaurant });
    });

    await axios({
      method: 'GET',
      url: '/promotions',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
      },
    }).then((response) => {
      const promotionRes = response.data.filter(
        (promotion) => promotion.restaurant.id === this.state.currentRestaurant,
      );
      this.setState({
        promotionList: promotionRes,
      });
    });
  }

  render() {
    if (this.state.promotionList.length === 0) {
      return <p>You have not created any promotion yet! :(</p>;
    } else {
      return <PromotionListDetail promotions={this.state.promotionList} />;
    }
  }
}

export default ViewPromotion;
