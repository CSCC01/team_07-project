import React, { Component } from 'react';

import './UploadImage.css';

import TextPopUp from '../sharedComponents/TextPopUp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

class UploadImage extends Component {
  state = {
    image: null,
    url: '',
    show: 0, // 0 - show nothing; 1 - show left; 2 - show right; 3 - show both
    numOfImage: 0,
  };

  // When the upload button is clicked
  imageButtonClick = () => {
    document.getElementById('image-input').click();
  };

  // This function is called when the input file is changed
  imageInputChange = (event) => {
    if (this.state.numOfImage > 4) {
      alert("Can't upload. Exceed the maximum number of images.");
    } else {
      if (event.target.files[0] != null) {
        let url = URL.createObjectURL(event.target.files[0]);
        let file = event.target.files[0];
        let numOfImage = this.state.numOfImage;

        this.setState({
          image: file,
          url: url,
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
        this.props.onSelectImage(file);
      }
    }
  };

  // Set the image that is currently showed and the arrow mode that is currently showed
  show = (url, show) => {
    this.setState({
      url: url,
      show: show,
    });
  };

  // Update url to be the cropped image
  onEdit = (url) => {
    this.setState({
      url: url,
    });
  };

  // This function is called when the delete button is pressed
  // It clears the image input field, decreases the numOfImage by 1
  // and updates url and show
  onDelete = (url, show) => {
    document.getElementById('image-input').value = '';
    let numOfImage = this.state.numOfImage;
    this.setState({
      url: url,
      numOfImage: numOfImage - 1,
      show: show,
    });
  };

  render() {
    return (
      <div>
        <TextPopUp
          title="Image"
          popup="Duplicate images are acceptable. Image is uploaded before the current image. Upload at most 5 images."
        />
        {/* Show the upload button, edit button, delete button, left arrow and right arrow based on different mode */}
        <div className="image-button-wrapper">
          {this.state.show === 0 ? (
            <div>
              <div className="upload-image">
                <Button
                  variant="outlined"
                  color="default"
                  startIcon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={this.imageButtonClick}
                  style={{ border: '#000 2px solid', color: '#000', backgroundColor: '#FFD564' }}
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
              <div className="background"></div>
            </div>
          ) : this.state.show === 1 ? (
            <div>
              <div className="button-wrapper">
                <div className="left-image">
                  <IconButton
                    color="default"
                    style={{
                      borderRadius: 10,
                      backgroundColor: '#FFD564',
                      border: '#000 2px solid',
                      color: '#000',
                    }}
                    onClick={this.props.onLeft}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </IconButton>
                </div>
                <div className="upload-image">
                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={this.imageButtonClick}
                    style={{ border: '#000 2px solid', color: '#000', backgroundColor: '#FFD564' }}
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
              <img className="image" src={this.state.url} alt=""></img>
              <div className="background"></div>
            </div>
          ) : (
            <div>
              <div className="button-wrapper hover">
                {this.state.show === 3 ? (
                  <div className="left-image">
                    <IconButton
                      color="default"
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#FFD564',
                        border: '#000 2px solid',
                        color: '#000',
                      }}
                      onClick={this.props.onLeft}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </IconButton>
                  </div>
                ) : null}
                <div className="upload-image">
                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={this.imageButtonClick}
                    style={{ border: '#000 2px solid', color: '#000', backgroundColor: '#FFD564' }}
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
                      color="default"
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#FFD564',
                        border: '#000 2px solid',
                        color: '#000',
                      }}
                      onClick={this.props.onRight}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </IconButton>
                  </div>
                ) : null}
              </div>
              {/* Image */}
              <img className="image" src={this.state.url} alt=""></img>
              {/* The grey background layer */}
              <div className="background"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UploadImage;
