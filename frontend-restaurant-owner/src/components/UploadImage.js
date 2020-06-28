import React, { Component } from 'react';

import './UploadImage.css';

import TextPopUp from './TextPopUp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';

class UploadImage extends Component {
  state = {
    image: '',
  };

  imageButtonClick = () => {
    document.getElementById('image-input').click();
  };

  imageInputChange = (event) => {
    let url = URL.createObjectURL(event.target.files[0]);
    this.setState({
      image: url,
    });
    this.props.onSelectImage(url);
  };

  onEdit = (url) => {
    this.setState({
      image: url,
    });
  };

  render() {
    return (
      <div>
        <TextPopUp
          title="Image"
          popup="User can only upload one image. Need to upload a different image after delete."
        />

        <div className="image-button-wrapper">
          <div className={this.state.image ? 'upload-image' : 'upload-image-init'}>
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
            />
          </div>
          {this.state.image ? (
            <div>
              <img className="image" src={this.state.image}></img>
              <div className="backgroud"></div>
            </div>
          ) : (
            <div className="backgroud"></div>
          )}
        </div>
      </div>
    );
  }
}

export default UploadImage;
