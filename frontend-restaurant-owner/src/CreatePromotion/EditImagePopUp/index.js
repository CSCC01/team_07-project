import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import ImageCropper from './ImageCropper';

class EditImagePopUp extends Component {
  state = {
    canvas: null,
  };

  onUpdate = (key, value) => {
    this.setState({ [key]: value });
    this.props.onSelectImage(value);
  };

  render() {
    return (
      <Popup
        trigger={
          <Button
            variant="outlined"
            color="#FFD564"
            startIcon={<FontAwesomeIcon icon={faEdit} />}
            style={{ border: '#000 2px solid', color: '#000', backgroundColor: '#FFD564' }}
          >
            Edit
          </Button>
        }
        modal
        closeOnDocumentClick
        contentStyle={{ width: '90%', height: 'fit-content', borderRadius: '20px', border: '0px' }}
      >
        {(close) => (
          <div style={{ margin: 30 }}>
            <IconButton style={{ position: 'absolute', top: 20, right: 20 }} onClick={close}>
              <FontAwesomeIcon icon={faTimes} style={{ marginLeft: 3, marginRight: 3 }} />
            </IconButton>
            <ImageCropper
              src={URL.createObjectURL(this.props.sourceImage)}
              close={close}
              onSelectImage={(value) => this.onUpdate('canvas', value)}
            ></ImageCropper>
          </div>
        )}
      </Popup>
    );
  }
}

export default EditImagePopUp;
