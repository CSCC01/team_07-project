import React, { Component } from 'react';
import axios from 'axios';
import './PromotionItem.css';

class PromotionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.promotion.image, // A list of images
      currentImgTop: 0, // The index of the top image
      currentImgBottom: 0, // The index of the bottom image
      indicator: 0, // 0 - change the index of the top image
      // 1 - change the index of the bottom image
      baseUrl: axios.defaults.baseURL, // baseURL of the database
    };
  }

  componentDidMount() {
    // Call changeBackgroundImage every 5 seconds
    this.interval = setInterval(() => this.changeBackgroundImage(), 5000);
  }

  componentWillUnmount() {
    // Clear the interval
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  changeBackgroundImage() {
    let newCurrentImg = 0;
    const { images, currentImgTop, currentImgBottom, indicator } = this.state;
    const noOfImages = images.length;

    if (indicator === 0) {
      // Increase the index of the top image if the current image is not the last one in the list
      // Otherwise, set the index to be zero
      // Change indicator to 1 so that next time we will change the index of the bottom image
      if (currentImgTop !== noOfImages - 1) {
        newCurrentImg = currentImgTop + 1;
      }
      this.setState({ currentImgTop: newCurrentImg, indicator: 1 });
    } else {
      // Increase the index of the bottom image if the current image is not the last one in the list
      // Otherwise, set the index to be zero
      // Change indicator to 0 so that next time we will change the index of the top image
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
        {/* Image layer */}
        {/* The top image and the bottom image are two consective images in the list */}
        {/* Use two images instead of one to add fade in transition */}
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
          {/* The title layer */}
          <div className="title-wrapper">
            <p className="title">{this.props.promotion.title}</p>
          </div>
          {/* The text layer */}
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
