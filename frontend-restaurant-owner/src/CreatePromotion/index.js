import React, { Component } from 'react';
import UploadImage from './UploadImage';
import TextPopUp from '../sharedComponents/TextPopUp';
import TextField from '@material-ui/core/TextField';
import CreateSubtask from './CreateSubtask';
import SelectReward from './SelectReward';
import EditImagePopUp from './EditImagePopUp';

import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import './index.css';

export default class CreatePromotion extends Component {
  state = {
    image: [null],
    sourceImage: [null],
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
    image.splice(currentIndex, 0, 0); // no modified image
    this.setState({ image: image });
    this.setState({ sourceImage: sourceImage });
    this.setState({ disable: 1 });
  };

  onLeft = () => {
    let currentIndex = this.state.currentIndex;
    this.setState({ currentIndex: currentIndex - 1 });

    let image = this.state.image;
    let sourceImage = this.state.sourceImage;

    let url = '';
    if (image[currentIndex - 1] === 0) {
      url = URL.createObjectURL(sourceImage[currentIndex - 1]);
    } else {
      url = image[currentIndex - 1].toDataURL('image/png');
    }

    let show = 3;
    if (currentIndex - 1 === 0) {
      show = 2;
    }
    this.setState({ disable: 1 });
    this.UploadImageRef.current.show(url, show);
  };

  onRight = () => {
    let currentIndex = this.state.currentIndex;
    this.setState({ currentIndex: currentIndex + 1 });

    let image = this.state.image;
    let sourceImage = this.state.sourceImage;

    let url = '';
    if (image[currentIndex + 1] === 0) {
      url = URL.createObjectURL(sourceImage[currentIndex + 1]);
    } else {
      url = image[currentIndex + 1] === null ? '' : image[currentIndex + 1].toDataURL('image/png');
    }

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
    this.UploadImageRef.current.onEdit(value.toDataURL('image/png'));
  };

  onDelete = () => {
    let sourceImage = this.state.sourceImage;
    let image = this.state.image;
    let currentIndex = this.state.currentIndex;
    sourceImage.splice(currentIndex, 1);
    image.splice(currentIndex, 1);
    this.setState({ image: image, sourceImage: sourceImage });

    let url = '';
    if (image[currentIndex] === 0) {
      url = URL.createObjectURL(sourceImage[currentIndex]);
    } else {
      url = image[currentIndex] === null ? '' : image[currentIndex].toDataURL('image/png');
    }

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
    // go to view promotion
  };

  submitPromotion = async () => {
    let title = this.state.title;
    let description = this.state.description;
    let startTime = this.state.startTime;
    let closeTime = this.state.closeTime;
    let tasks = this.state.tasks;
    let image = this.state.image;
    let sourceImage = this.state.sourceImage;
    console.log(title);
    console.log(description);
    console.log(startTime);
    console.log(closeTime);
    console.log(tasks);
    console.log(image);
    console.log(sourceImage);
    for (let key of ['title', 'description', 'startTime', 'closeTime']) {
      if (this.state[key] === '') {
        alert(`Failure: ${key} empty`);
      }
    }

    if (this.state.sourceImage.length === 1) {
      alert('Failure: image empty');
    } else if (lessTime(this.state.closeTime, this.state.startTime)) {
      alert('Failure: closeTime before startTime');
    } else if (lessTime(this.state.startTime, getToday())) {
      alert('Failure: startTime before today');
    } else if (this.state.reward === -1) {
      alert('Failure: reward empty');
    }
    // else {
    //   let sourceImage = this.state.sourceImage;
    //   let image = this.state.image;

    //   // upload image to strapi

    //   let file;
    //   let getId;
    //   let idList = [];
    //   for (let index = 0; index < image.length - 1; index++) {
    //     if (image[index] === 0) {
    //       // if user doesn't modified the image
    //       file = sourceImage[index];
    //       let imageFile = new FormData();
    //       imageFile.append('files', file);
    //       getId = await axios({
    //         method: 'POST',
    //         url: 'http://localhost:1337/upload',
    //         data: imageFile,
    //       });
    //       idList.push(getId.data[0].id);
    //     } else {
    //       // if user modified the image
    //       let blob = await new Promise((resolve) => image[index].toBlob(resolve, 'image/png'));
    //       let imageCanvas = new FormData();
    //       imageCanvas.append('files', blob);
    //       getId = await axios({
    //         method: 'POST',
    //         url: 'http://localhost:1337/upload',
    //         data: imageCanvas,
    //       });
    //       idList.push(getId.data[0].id);
    //     }
    //   }

    //   // get uploaded image url
    //   let uploadedImage = [];
    //   for (let i = 0; i < idList.length; i++) {
    //     let getUrl = await axios({
    //       method: 'GET',
    //       url: 'http://localhost:1337/upload/files/' + idList[i],
    //     });
    //     uploadedImage.push(getUrl.data.url);
    //   }

    //   // save data to the database
    //   let title = this.state.title;
    //   let description = this.state.description;
    //   let startTime = this.state.startTime;
    //   let closeTime = this.state.closeTime;
    //   let tasks = this.state.tasks;

    //   let data = {
    //     image: uploadedImage,
    //     title: title,
    //     description: description,
    //     starting_date: startTime,
    //     expired_date: closeTime,
    //     subtask: tasks,
    //   };
    //   let add = await axios({
    //     method: 'POST',
    //     url: 'http://localhost:1337/promotions',
    //     data,
    //   });
    //   if (add.status == 200) {
    //     alert('Promotion has successfully been added.');
    //   } else {
    //     alert('Something went wrong with the server.');
    //   }
    // }
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

            <CreateSubtask onSelectTask={(value) => this.onUpdate('tasks', value)} />
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
            id="submit"
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

function lessTime(t1, t2) {
  return new Date(t1) < new Date(t2);
}

function getToday() {
  return new Date().toString();
}
