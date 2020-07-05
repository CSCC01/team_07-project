import React, { Component } from 'react';

import './UploadImage.css';

import TextPopUp from './TextPopUp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

class UploadImage extends Component {
  state = {
    image: '',
    show: 0, // 0 - show nothing; 1 - show left; 2 - show right; 3 - show both
    numOfImage: 0,
  };

  imageButtonClick = () => {
    document.getElementById('image-input').click();
  };

  imageInputChange = (event) => {
    if (this.state.numOfImage > 4) {
      alert("Can't upload. Exceed the maximum number of images.");
    } else {
      if (event.target.files[0] != null) {
        let url = URL.createObjectURL(event.target.files[0]);
        let numOfImage = this.state.numOfImage;

        this.setState({
          image: url,
          numOfImage: numOfImage + 1,
        });

        let show = this.state.show;
        if (show === 0) {
          this.setState({
            show: 2,
          });
        } else if (show === 1) {
          this.setState({
            show: 3,
          });
        }
        this.props.onSelectImage(url);
      }
    }
  };

  show = (url, show) => {
    this.setState({
      image: url,
      show: show,
    });
  };

  onEdit = (url) => {
    this.setState({
      image: url,
    });
  };

  onDelete = (url) => {
    document.getElementById('image-input').value = '';
    let numOfImage = this.state.numOfImage;
    this.setState({
      image: url,
      numOfImage: numOfImage - 1,
    });
  };

  render() {
    return (
      <div>
        <TextPopUp
          title="Image"
          popup="Duplicate images are acceptable. Image is uploaded before the current image. Upload at most 5 images."
        />

        <div className="image-button-wrapper">
          {this.state.show === 0 ? (
            <div>
              <div className="upload-image">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FontAwesomeIcon icon={faPlus} />}
                  className="image-upload-button"
                  onClick={this.imageButtonClick}
                >
                  Upload
                </Button>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  id="image-input"
                  onChange={this.imageInputChange}
                  accept=".jpg, .jpeg, .png"
                />
              </div>
              <div className="backgroud"></div>
            </div>
          ) : this.state.show === 1 ? (
            <div>
              <div className="button-wrapper">
                <div className="left-image">
                  <IconButton
                    color="secondary"
                    style={{ borderRadius: 10 }}
                    onClick={this.props.onLeft}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </IconButton>
                </div>
                <div className="upload-image">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={this.imageButtonClick}
                  >
                    Upload
                  </Button>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    id="image-input"
                    onChange={this.imageInputChange}
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
              </div>
              <img className="image" src={this.state.image} alt=""></img>
              <div className="backgroud"></div>
            </div>
          ) : (
            <div>
              <div className="button-wrapper hover">
                {this.state.show === 3 ? (
                  <div className="left-image">
                    <IconButton
                      color="secondary"
                      style={{ borderRadius: 10 }}
                      onClick={this.props.onLeft}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </IconButton>
                  </div>
                ) : null}
                <div className="upload-image">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={this.imageButtonClick}
                  >
                    Upload
                  </Button>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    id="image-input"
                    onChange={this.imageInputChange}
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
                {this.state.show === 2 || this.state.show === 3 ? (
                  <div className="right-image">
                    <IconButton
                      color="secondary"
                      style={{ borderRadius: 10 }}
                      onClick={this.props.onRight}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </IconButton>
                  </div>
                ) : null}
              </div>
              <img className="image" src={this.state.image} alt=""></img>
              <div className="backgroud"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UploadImage;
