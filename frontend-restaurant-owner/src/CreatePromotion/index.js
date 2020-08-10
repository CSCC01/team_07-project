import React, { Component } from 'react';
import UploadImage from './UploadImage';
import TextPopUp from '../sharedComponents/TextPopUp';
import CreateSubtask from './CreateSubtask';
import EditImagePopUp from './EditImagePopUp';

import Button from '@material-ui/core/Button';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
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
    startDate: null,
    endDate: null,
    tasks: [],
    reward: -1,
    disable: 1, // 0 - disable; 1 - enable
  };
  UploadImageRef = React.createRef();

  // For the title, description, tasks and reward field
  onUpdate = (key, value) => {
    this.setState({ [key]: value });
  };

  // For the image field
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

  // Go to the image on the left
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

  // Go to the image on the right
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

  // When the image is cropped
  onEdit = (value) => {
    let image = this.state.image;
    image[this.state.currentIndex] = value;
    this.setState({ image: image });
    this.UploadImageRef.current.onEdit(value.toDataURL('image/png'));
  };

  // When the delete button is pressed
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

  // When the submit button is pressed
  submitPromotion = async () => {
    let jwt_token = localStorage.getItem('Authorization-Token');
    let restaurant = await getRestaurant('/users/me/', jwt_token);
    let restaurant_id = restaurant[0];
    let title = this.state.title;
    let description = this.state.description;
    let startTime = this.state.startDate.format();
    let closeTime = this.state.endDate.format();
    let tasks = this.state.tasks;
    let image = this.state.image;
    let sourceImage = this.state.sourceImage;
    let reward = this.state.reward;

    // Check user input
    let indicator = checkData(title, description, startTime, closeTime, sourceImage, reward);

    // Upload image to the backend and get the corresponding url
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
    // post data to the backend
    if (indicator === 1) {
      output = await postData(
        '/promotions',
        title,
        description,
        startTime,
        closeTime,
        tasks,
        uploadedImage,
        reward,
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
          {/* Image */}
          <div style={{ marginRight: 20 }}>
            <UploadImage
              ref={this.UploadImageRef}
              onSelectImage={(image) => this.onLoad(image)}
              onLeft={this.onLeft}
              onRight={this.onRight}
            />

            <div
              className={
                this.state.image.length !== 1 && this.state.disable !== 0
                  ? 'left-button-row show'
                  : 'left-button-row'
              }
            >
              <EditImagePopUp
                sourceImage={this.state.sourceImage[this.state.currentIndex]}
                onSelectImage={(value) => this.onEdit(value)}
              />
              <Button
                variant="outlined"
                color="default"
                onClick={this.onDelete}
                startIcon={<FontAwesomeIcon icon={faTrash} />}
                style={{ border: '#000 2px solid', color: '#000', backgroundColor: '#FFD564' }}
              >
                Delete
              </Button>
            </div>
          </div>

          <div>
            {/* Title */}
            <div style={{ marginBottom: 10 }}>
              <TextPopUp title="Title" popup="Limitation: 30 characters" />
              <input
                type="text"
                className="create-promotion-title"
                onChange={(event) => this.onUpdate('title', event.target.value)}
                maxLength="30"
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 10 }}>
              <TextPopUp title="Description" popup="Limitation: 500 characters" />
              <textarea
                rows="5"
                className="create-promotion-description"
                onChange={(event) => this.onUpdate('description', event.target.value)}
                maxLength="500"
              />
            </div>
          </div>

          <div style={{ marginLeft: 20 }}>
            {/* Date Inputs */}
            <div style={{ marginBottom: 10 }}>
              <TextPopUp title="Date" popup="Empty" />

              <div style={{ textAlign: 'left' }}>
                <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => {
                    this.setState({ startDate, endDate });
                  }}
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                  noBorder={true}
                />
              </div>
            </div>

            {/* Subtask */}
            <CreateSubtask onSelectTask={(value) => this.onUpdate('tasks', value)} />
            {/* Reward */}
            <div style={{ marginBottom: 10 }}>
              <TextPopUp title="Reward" popup="Limitation: 300 characters" />
              <textarea
                rows="4"
                className="create-promotion-description"
                onChange={(event) => this.onUpdate('reward', event.target.value)}
                maxLength="300"
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            id="submit"
            variant="outlined"
            color="secondary"
            style={{
              marginLeft: 40,
              border: '#000 2px solid',
              color: '#000',
              backgroundColor: '#FFD564',
            }}
            onClick={this.submitPromotion}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

// This function gets the restaurant that current user belongs to.
// Return a list of two elements.
// The first element is the restaurant id.
// The second element is the axios status code.
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

// This function validate user input.
// Return 1 if everything is valid.
// Otherwise return -1.
export const checkData = (title, description, startTime, closeTime, sourceImage, reward) => {
  let prompt = [];

  if (title === '') {
    prompt.push('Failure: title is empty');
  }
  if (description === '') {
    prompt.push('Failure: description is empty');
  }
  if (startTime === null) {
    prompt.push('Failure: start time is empty');
  }
  if (closeTime === null) {
    prompt.push('Failure: expired time is empty');
  }
  if (sourceImage.length === 1) {
    prompt.push('Failure: image is empty');
  }
  if (!reward) {
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

// This function uploads the local image to the backend.
// Return {-1: -1} if fails.
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

// This function gets the image urls that are uploaded to the backend.
// Return {-1: -1} if fails.
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

// This function posts data to the backend.
// Return {-1: -1} if fails.
export const postData = async (
  url,
  title,
  description,
  startTime,
  closeTime,
  tasks,
  uploadedImage,
  reward,
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
    coupon: reward,
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
