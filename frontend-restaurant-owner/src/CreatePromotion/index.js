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
    let jwt_token = localStorage.getItem('Authorization-Token');
    let restaurant = await getRestaurant('/users/me/', jwt_token);
    let restaurant_id = restaurant[0];
    let title = this.state.title;
    let description = this.state.description;
    let startTime = this.state.startTime;
    let closeTime = this.state.closeTime;
    let tasks = this.state.tasks;
    let image = this.state.image;
    let sourceImage = this.state.sourceImage;
    let reward = this.state.reward;

    let indicator = checkData(title, description, startTime, closeTime, sourceImage, reward);

    let idDict;
    let uploadedImage;
    let output;
    if (indicator === 1) {
      idDict = await uploadImage(sourceImage, image, '/upload');
      for (let key in idDict) {
        let status = idDict[key];
        if (status !== 200) {
          indicator = 0;
          break;
        }
      }
    }
    if (indicator === 1) {
      uploadedImage = await getUrl(idDict, '/upload/files/');
      for (let key in uploadedImage) {
        let status = uploadedImage[key];
        if (status !== 200) {
          indicator = 0;
          break;
        }
      }
    }
    if (indicator === 1) {
      output = await postData(
        '/promotions',
        title,
        description,
        startTime,
        closeTime,
        tasks,
        uploadedImage,
        restaurant_id,
      );
      indicator = Object.values(output)[0] === 200 ? 1 : 0;
    }
    if (indicator === 1) {
      alert('Promotion has successfully been added.');
    } else if (indicator === 0) {
      alert('Something went wrong with the backend.');
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

export const getRestaurant = async (url, jwt_token) => {
  let restaurant_id;
  await axios({
    method: 'GET',
    url: url,
    headers: {
      Authorization: 'Bearer ' + jwt_token,
    },
  })
    .then((response) => {
      restaurant_id = [response.data.restaurant, response.status];
    })
    .catch(() => {
      restaurant_id = [-1, -1];
    });
  return restaurant_id;
};

export const lessTime = (t1, t2) => {
  return new Date(t1) < new Date(t2);
};

export const getToday = () => {
  return new Date().toString();
};

export const checkData = (title, description, startTime, closeTime, sourceImage, reward) => {
  let prompt = [];

  if (title === '') {
    prompt.push('Failure: title is empty');
  }
  if (description === '') {
    prompt.push('Failure: description is empty');
  }
  if (startTime === '') {
    prompt.push('Failure: start time is empty');
  }
  if (closeTime === '') {
    prompt.push('Failure: expired time is empty');
  }
  if (sourceImage.length === 1) {
    prompt.push('Failure: image is empty');
  }
  if (lessTime(closeTime, startTime)) {
    prompt.push('Failure: closeTime before startTime');
  }
  if (lessTime(startTime, getToday())) {
    prompt.push('Failure: startTime before today');
  }
  if (!['points', 'coupon'].includes(reward.type)) {
    prompt.push('Failure: reward type is empty');
  }
  if (!reward.value) {
    prompt.push('Failure: reward is empty');
  }

  let output = prompt.join('\n');
  let indicator = 1;
  if (output !== '') {
    alert(output);
    indicator = -1;
  }

  return indicator;
};

export const uploadImage = async (sourceImage, image, url) => {
  let file;
  let idDict = {};
  for (let index = 0; index < image.length - 1; index++) {
    if (image[index] === 0) {
      // if user doesn't modified the image
      file = sourceImage[index];
      let imageFile = new FormData();
      imageFile.append('files', file);

      await axios({
        method: 'POST',
        url: url,
        data: imageFile,
      })
        .then((response) => {
          idDict[response.data[0].id] = response.status;
        })
        .catch(() => {
          idDict[-1] = -1;
        });
    } else {
      // if user modified the image
      let blob = await new Promise((resolve) => image[index].toBlob(resolve, 'image/png'));
      let imageCanvas = new FormData();
      imageCanvas.append('files', blob);

      await axios({
        method: 'POST',
        url: url,
        data: imageCanvas,
      })
        .then((response) => {
          idDict[response.data[0].id] = response.status;
        })
        .catch(() => {
          idDict[-1] = -1;
        });
    }
  }
  return idDict;
};

export const getUrl = async (idDict, url) => {
  let uploadedImage = {};
  for (let key in idDict) {
    await axios({
      method: 'GET',
      url: url + key,
    })
      .then((response) => {
        uploadedImage[response.data.url] = response.status;
      })
      .catch(() => {
        uploadedImage[-1] = -1;
      });
  }
  return uploadedImage;
};

export const postData = async (
  url,
  title,
  description,
  startTime,
  closeTime,
  tasks,
  uploadedImage,
  restaurant_id,
) => {
  let output = {};
  let data = {
    image: Object.keys(uploadedImage),
    title: title,
    description: description,
    starting_date: startTime,
    expired_date: closeTime,
    subtask: tasks,
    restaurant: restaurant_id,
  };

  await axios({
    method: 'POST',
    url: url,
    data: data,
  })
    .then((response) => {
      output[response.data.id] = response.status;
    })
    .catch(() => {
      output[-1] = -1;
    });
  return output;
};
