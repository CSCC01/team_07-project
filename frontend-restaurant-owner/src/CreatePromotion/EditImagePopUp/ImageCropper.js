import React from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import Button from '@material-ui/core/Button';

import './ImageCropper.css';

class ImageCropper extends React.Component {
  constructor() {
    super();
    this.state = {
      imageDestination: '',
      canvas: null,
    };
    this.imageElement = React.createRef();
  }

  componentDidMount() {
    const cropper = new Cropper(this.imageElement.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        this.setState({ imageDestination: canvas.toDataURL('image/png'), canvas: canvas });
      },
    });
  }

  save = () => {
    this.props.onSelectImage(this.state.canvas);
    this.props.close();
  };

  render() {
    return (
      <div className="wrapper">
        {/* Title and SourceImage with a cropped canvas */}
        <div className="left">
          <p className="cropper-title">Source image</p>
          <img
            ref={this.imageElement}
            src={this.props.src}
            alt="Source"
            className="popup-img-origin"
          />
        </div>
        {/* Review of the cropped image and save button */}
        <div className="right">
          <p className="cropper-title">Preview</p>
          <img src={this.state.imageDestination} className="popup-img-preview" alt="Destination" />
          <Button
            variant="outlined"
            color="#FFD564"
            style={{
              border: '#000 2px solid',
              color: '#000',
              backgroundColor: '#FFD564',
              marginTop: 30,
            }}
            onClick={this.save}
          >
            save
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
