import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Typography } from '@material-ui/core';

import './index.css'

const jwt_token = localStorage.getItem('Authorization-Token');

function PromotionDetails(props) {
    const [data, setData] = useState({});
    const [images, setImages] = useState([]); // images as a Carousel element

    useEffect(() => {
      const { params: { id } } = props.match;
      getPromotionDetails(id, jwt_token).then((data) => {
        setData(data);
        console.log(data);
        const carousel = 
        <Carousel renderThumbs={()=>{}}>
          {data.image.map(url => 
          (<div>
            <img src={axios.defaults.baseURL + url}/>
           </div>))}
        </Carousel>;
        setImages(carousel);
      });
    }, [data])

    return (
      <>
        {images}
        <Typography variant="h4" component="h1" className="title">
          {data.title}
        </Typography>
        <Typography component="h1" className="title">
          {data.description}
        </Typography>
        {data.subtask}
        {data.expired_date}
      </>
    );
  };

export const getPromotionDetails = async (id, jwt_token) => {
  const promotionDetails = await axios.get('/promotions/'+ id, {
    headers: {
        Authorization: 'Bearer ' + jwt_token,
    }
  })
  return promotionDetails.data;
}

export default PromotionDetails;