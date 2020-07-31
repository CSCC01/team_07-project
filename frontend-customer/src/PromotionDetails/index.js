import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Typography } from '@material-ui/core';
import Progress from './Progress';

import './index.css'

const jwt_token = localStorage.getItem('Authorization-Token');

export default function PromotionDetails(props) {
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
    }, [])

    return (
      <>
        {images}
        <Typography variant="h4" component="h1" className="title">
          {data.title}
        </Typography>
        <Typography>
          {"Closing Time:" + data.expired_date}
        </Typography>
        <Typography component="h1" className="title">
          {data.description}
        </Typography>
        <Progress content={data.subtask} />
        
      </>
    );
  };

export const getPromotionDetails = async (id, jwt_token) => {
  const promotionDetails = await axios.get('/promotions/'+ id, {
    headers: {
        Authorization: 'Bearer ' + jwt_token,
    }
  })
  console.log(promotionDetails.data);
  return promotionDetails.data;
}
