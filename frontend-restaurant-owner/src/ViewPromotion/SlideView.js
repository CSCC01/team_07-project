import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SlideView(props) {
  var urlList = props.images;
  return (
    <div style={{ width: 500 }}>
      <Slider
        speed={500}
        slideToShow={1}
        slidesToScroll={1}
        infinite={true}
        dots={true}
        autoplay={true}
      >
        {urlList &&
          urlList.map((url, index) => (
            <img
              key={index}
              src={axios.defaults.baseURL + url}
              alt="promotion img"
              style={{ maxWidth: 500, maxHeight: 500 }}
            ></img>
          ))}
      </Slider>
    </div>
  );
}

export default SlideView;
