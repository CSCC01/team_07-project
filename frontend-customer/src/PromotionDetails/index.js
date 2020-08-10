import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Progress from './Progress';
import TitleBar from '../sharedComponents/TitleBar';

import "./index.css";

export default function PromotionDetails(props) {
    const [data, setData] = useState({});
    const [images, setImages] = useState([]); // images as a Carousel element
    const [progress, setProgress] = useState({}); // {} if no progress

    const { params: { id } } = props.match;

    useEffect(() => {
      const { params: { id } } = props.match;
      getPromotionDetails(id).then((data) => {
        setData(data);

        const carousel =
          <Carousel renderThumbs={()=>{}}>
            {data.image.map(url =>
            (<div className="imageCutter">
              <img src={axios.defaults.baseURL + url} alt="promotion img" style={{width: '100vw', height: '100vw',objectFit: 'cover'}}/>
            </div>))}
          </Carousel>;
        setImages(carousel);

        axios.get('/users/me', {
          headers: {
          Authorization: 'Bearer ' + localStorage.getItem('Authorization-Token'),
          }
        }).then((user)=>{
          for (let i=0; i<data.progresses.length; i++) {
            if (data.progresses[i].user === user.data.id) {
              setProgress(data.progresses[i]);
              break;
            }
          }
        })
      });
    }, [props.match])

    let basicInfo = "Loading";
    if ((Object.keys(data).length !== 0)) { // data is not empty
      basicInfo = (
        <>
          <div>
            <p className="promotion-title">{data.title}</p>
            <p className="restaurant-name">{data.restaurant.name}</p>
            <p className="title">Closing Time: <span className="content">{new Date(data.expired_date).toLocaleString()}</span></p>
            <div className="title">Description: </div>
            <div className="content margin-left">{data.description}</div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className='title-bar'>
          <TitleBar title='Promotion'/>
        </div>
        {images}
        <div className="promotionDetails">
          {basicInfo}
          <Progress content={data.subtask} id={id} />
        </div>
      </>
  );
}

export const getPromotionDetails = async (id) => {
  const promotionDetails = await axios.get("/promotions/" + id);
  return promotionDetails.data;
};
