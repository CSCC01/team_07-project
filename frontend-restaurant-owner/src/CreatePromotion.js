import React, { Component } from 'react';
import UploadImage from './components/UploadImage';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import CreateSubtask from './components/CreateSubtask';
import DateInput from './components/DateInput';
import SelectReward from './components/SelectReward';
import EditImagePopUp from './components/EditImagePopUp';

import Button from '@material-ui/core/Button';
// import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './CreatePromotion.css';

class CreatePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  onUpdate = (key, value) => {
    this.setState({ [key]: value });
    console.log(key, value);
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
    this.refs.child.show(url, show); // eslint-disable-line
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
    this.refs.child.show(url, show); // eslint-disable-line
  };

  onEdit = (value) => {
    let image = this.state.image;
    image[this.state.currentIndex] = value;
    this.setState({ image: image });
    this.refs.child.onEdit(value); // eslint-disable-line
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
    this.refs.child.onDelete(url, show); // eslint-disable-line
  };

  discardPromotion = () => {
    // goback
  };

  submitPromotion = async () => {
    if (this.state.image.length === 1) {
      alert('Failure: image empty');
    } else if (this.state.title === '') {
      alert('Failure: title empty');
    } else if (this.state.description === '') {
      alert('Failure: description empty');
    } else if (this.state.startTime === '') {
      console.log(this.state.startTime);
      alert('Failure: startTime empty');
    } else if (this.state.closeTime === '') {
      alert('Failure: closeTime empty');
    } else if (lessTime(this.state.closeTime, this.state.startTime)) {
      alert('Failure: closeTime before startTime');
    } else if (lessTime(this.state.closeTime, getToday())) {
      alert('Failure: startTime before today');
    } else if (this.state.reward === -1) {
      alert('Failure: reward empty');
    } else {
      // const sourceImage = this.state.sourceImage;
      // const title = this.state.title;
      // const description = this.state.description;
      // const startTime = this.state.startTime;
      // const closeTime = this.state.closeTime;
      // const data = {
      //   image: sourceImage,
      //   title: title,
      //   description: description,
      //   starting_date: startTime,
      //   closing_date: closeTime,
      // };
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
              ref="child"  // eslint-disable-line
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
            <TitleInput onSelectTitle={(value) => this.onUpdate('title', value)} />
            <DescriptionInput
              onSelectDescription={(value) => this.onUpdate('description', value)}
            />
            <DateInput
              onSelectStartTime={(value) => this.onUpdate('startTime', value)}
              onSelectCloseTime={(value) => this.onUpdate('closeTime', value)}
            />
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
  let t1Arr = t1.split('-');
  let t2Arr = t2.split('-');
  if (parseInt(t1Arr[0]) > parseInt(t2Arr[0])) {
    return 0;
  } else if (parseInt(t1Arr[1]) > parseInt(t2Arr[1])) {
    return 0;
  } else {
    let t1Arr1 = t1Arr[2].split('T');
    let t2Arr1 = t2Arr[2].split('T');
    if (parseInt(t1Arr1[0]) > parseInt(t2Arr1[0])) {
      return 0;
    } else {
      let t1Arr3 = t1Arr1[1].split(':');
      let t2Arr3 = t2Arr1[1].split(':');
      if (parseInt(t1Arr3[0]) > parseInt(t2Arr3[0])) {
        return 0;
      } else if (parseInt(t1Arr3[0]) > parseInt(t2Arr3[0])) {
        return 0;
      }
    }
  }
  return 1;
}

function getToday() {
  let today = new Date();
  let time =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate() +
    'T' +
    today.getHours() +
    ':' +
    today.getMinutes();
  return time;
}
