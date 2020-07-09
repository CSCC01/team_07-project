import React, { Component } from 'react';
import UploadImage from './components/UploadImage';
import TextPopUp from './components/TextPopUp';
import TextField from '@material-ui/core/TextField';
import CreateSubtask from './components/CreateSubtask';
import SelectReward from './components/SelectReward';
import EditImagePopUp from './components/EditImagePopUp';

import Button from '@material-ui/core/Button';
// import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './CreatePromotion.css';

class CreatePromotion extends Component {
  state = {
    image: [''],
    sourceImage: [''],
    currentIndex: 0,
    title: '',
    description: '',
    startTime: '',
    closeTime: '',
    tasks: [],
    reward: -1,
    disable: 1, // 0 - disable; 1 - enable
  };
  UploadImageRef = React.createRef();

  onUpdate = (key, value) => {
    this.setState({ [key]: value });
  };

  onLoad = (value) => {
    let sourceImage = this.state.sourceImage;
    let image = this.state.image;
    let currentIndex = this.state.currentIndex;
    sourceImage.splice(currentIndex, 0, value);
    image.splice(currentIndex, 0, value);
    this.setState({ image: image });
    this.setState({ sourceImage: sourceImage });
    this.setState({ disable: 1 });
  };

  onLeft = () => {
    let currentIndex = this.state.currentIndex;
    this.setState({ currentIndex: currentIndex - 1 });

    let image = this.state.image;
    let url = image[currentIndex - 1];
    let show = 3;
    if (currentIndex - 1 === 0) {
      show = 2;
    }
    this.setState({ disable: 1 });
    this.UploadImageRef.current.show(url, show);
  };

  onRight = () => {
    let currentIndex = this.state.currentIndex;
    let image = this.state.image;
    this.setState({ currentIndex: currentIndex + 1 });

    let url = image[currentIndex + 1];
    let show = 3;
    if (currentIndex + 2 === image.length) {
      show = 1;
      this.setState({ disable: 0 });
    }
    this.UploadImageRef.current.show(url, show);
  };

  onEdit = (value) => {
    let image = this.state.image;
    image[this.state.currentIndex] = value;
    this.setState({ image: image });
    this.UploadImageRef.current.onEdit(value);
  };

  onDelete = () => {
    let sourceImage = this.state.sourceImage;
    let image = this.state.image;
    let currentIndex = this.state.currentIndex;
    sourceImage.splice(currentIndex, 1);
    image.splice(currentIndex, 1);
    this.setState({ image: image, sourceImage: sourceImage });

    let url = image[this.state.currentIndex];
    let show;
    if (currentIndex === 0) {
      if (image.length === 1) {
        show = 0;
        this.setState({ disable: 0 });
      } else {
        show = 2;
      }
    } else {
      if (currentIndex !== image.length - 1) {
        show = 3;
      } else {
        show = 1;
        this.setState({ disable: 0 });
      }
    }
    this.UploadImageRef.current.onDelete(url, show);
  };

  discardPromotion = () => {
    // goBack
  };

  submitPromotion = async () => {
    for (let key of ['title', 'description', 'startTime', 'closeTime']) {
      if (this.state[key] === '') {
        alert(`Failure: ${key} empty`);
      }
    }

    if (this.state.image.length === 1) {
      alert('Failure: image empty');
    } else if (lessTime(this.state.closeTime, this.state.startTime)) {
      alert('Failure: closeTime before startTime');
    } else if (lessTime(this.state.closeTime, getToday())) {
      alert('Failure: startTime before today');
    } else if (this.state.reward === -1) {
      alert('Failure: reward empty');
    } else {
      const sourceImage = this.state.sourceImage;
      const title = this.state.title;
      const description = this.state.description;
      const startTime = this.state.startTime;
      const closeTime = this.state.closeTime;
      const data = {
        image: sourceImage,
        title: title,
        description: description,
        starting_date: startTime,
        closing_date: closeTime,
      };
      console.log(data);
      // const add = await Axios({
      //   method: 'POST',
      //   url: 'http://localhost:1337/promotions',
      //   data,
      // });
      // if (add.status === 200) {
      //   alert('Promotion has successfully been added.');
      // } else {
      //   alert('Something went wrong with the server.');
      // }
      // connect to the backend
    }
  };

  render() {
    return (
      <div className="create-promotion-wrapper">
        <div className="input-wrapper">
          <div style={{ marginRight: 20 }}>
            <UploadImage
              ref={this.UploadImageRef}
              onSelectImage={(image) => this.onLoad(image)}
              onLeft={this.onLeft}
              onRight={this.onRight}
            />

            {this.state.image.length !== 1 && this.state.disable !== 0 ? (
              <div className="left-button-row">
                <EditImagePopUp
                  sourceImage={this.state.sourceImage[this.state.currentIndex]}
                  onSelectImage={(value) => this.onEdit(value)}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.onDelete}
                  startIcon={<FontAwesomeIcon icon={faTrash} />}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>

          <div style={{ marginLeft: 20 }}>
            {/* Title */}
            <div style={{ marginBottom: 10 }}>
              <TextPopUp title="Title" popup="Limitation: 30 characters" />
              <TextField
                variant="outlined"
                fullWidth
                onChange={(event) => this.onUpdate('title', event.target.value)}
                inputProps={{ maxLength: 30 }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 10 }}>
              <TextPopUp title="Description" popup="Limitation: 500 characters" />
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                onChange={(event) => this.onUpdate('description', event.target.value)}
                inputProps={{ maxLength: 500 }}
              />
            </div>

            {/* Date Inputs */}
            <div style={{ marginBottom: 10, textAlign: 'left' }}>
              <TextPopUp title="Date" popup="Empty" />
              <form noValidate>
                <TextField
                  label="Starting Time"
                  type="datetime-local"
                  defaultValue="2020-01-01T00:00"
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => this.onUpdate('startTime', event.target.value)}
                />
                <br />
                <TextField
                  label="Expiring Time"
                  type="datetime-local"
                  defaultValue="2020-01-01T00:00"
                  InputLabelProps={{ shrink: true }}
                  onChange={(event) => this.onUpdate('closeTime', event.target.value)}
                />
              </form>
            </div>

            <CreateSubtask onSelectTask={(value) => this.onUpdate('task', value)} />
            <SelectReward onSelectReward={(value) => this.onUpdate('reward', value)} />
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: 40 }}
            onClick={this.discardPromotion}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 40 }}
            onClick={this.submitPromotion}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default CreatePromotion;

function lessTime(t1, t2) {
  return new Date(t1) < new Date(t2);
}

function getToday() {
  return new Date().toString();
}
