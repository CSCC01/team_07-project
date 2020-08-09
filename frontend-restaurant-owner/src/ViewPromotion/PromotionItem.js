import React, { Component } from 'react';
import axios from 'axios';
import './PromotionItem.css';

class PromotionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.promotion.image,
      currentImgTop: 0,
      currentImgBottom: 0,
      indicator: 0,
      baseUrl: axios.defaults.baseURL,
    };
  }

  componentDidMount() {
    let time;
    if (this.props.promotion.id % 2 === 1) {
      time = 5000;
    } else {
      time = 5000;
    }
    this.interval = setInterval(() => this.changeBackgroundImage(), time);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  changeBackgroundImage() {
    let newCurrentImg = 0;
    const { images, currentImgTop, currentImgBottom, indicator } = this.state;
    const noOfImages = images.length;

    if (indicator === 0) {
      if (currentImgTop !== noOfImages - 1) {
        newCurrentImg = currentImgTop + 1;
      }
      this.setState({ currentImgTop: newCurrentImg, indicator: 1 });
    } else {
      if (currentImgBottom !== noOfImages - 1) {
        newCurrentImg = currentImgBottom + 1;
      }
      this.setState({ currentImgBottom: newCurrentImg, indicator: 0 });
    }
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          paddingBottom: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          className="image bottom"
          src={this.state.baseUrl + this.state.images[this.state.currentImgBottom]}
          alt=""
        ></img>
        <img
          className="image top"
          src={this.state.baseUrl + this.state.images[this.state.currentImgTop]}
          alt=""
        ></img>

        <div className="text-title-wrapper">
          <div className="title-wrapper">
            <p className="title">{this.props.promotion.title}</p>
          </div>
          <div className="text-wrapper">
            <div className="text">
              <p style={{ fontSize: '1.5em', fontWeight: 600, marginTop: 15, marginBottom: 0 }}>
                Description:{' '}
              </p>
              <p style={{ fontSize: '1.2em', fontWeight: 300, marginTop: 10, marginLeft: 15 }}>
                {this.props.promotion.description}
              </p>
              <p style={{ fontSize: '1.5em', fontWeight: 600, marginTop: 10, marginBottom: 0 }}>
                Starting Date:{' '}
              </p>
              <p style={{ fontSize: '1.2em', fontWeight: 300, marginTop: 10, marginLeft: 15 }}>
                {new Date(this.props.promotion.starting_date).toLocaleString()}
              </p>
              <p style={{ fontSize: '1.5em', fontWeight: 600, marginTop: 10, marginBottom: 0 }}>
                Expired Date:{' '}
              </p>
              <p style={{ fontSize: '1.2em', fontWeight: 300, marginTop: 10, marginLeft: 15 }}>
                {new Date(this.props.promotion.expired_date).toLocaleString()}
              </p>
              <p style={{ fontSize: '1.5em', fontWeight: 600, marginTop: 10, marginBottom: 0 }}>
                Subtasks:
              </p>
              <ul style={{ fontSize: '1.2em', fontWeight: 300, marginTop: 10, marginLeft: 15 }}>
                {this.props.promotion &&
                  this.props.promotion.subtask.map((sub, index) => (
                    <li style={{ fontSize: '1em', fontWeight: 300, marginTop: 10 }} key={index}>
                      {sub}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PromotionItem;
