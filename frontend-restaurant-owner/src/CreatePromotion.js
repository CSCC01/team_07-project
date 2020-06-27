import React, { Component } from 'react';
import UploadImage from './components/UploadImage';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import CreateSubtask from './components/CreateSubtask';
import DateInput from './components/DateInput';
import SelectReward from './components/SelectReward';
import Button from '@material-ui/core/Button';

import './CreatePromotion.css';

class CreatePromotion extends Component {
  state = {
    image: '',
    title: '',
    description: '',
    startTime: '',
    closeTime: '',
    tasks: [],
    reward: -1,
    show: 0,
  };

  onClick = () => {
    this.setState({ show: !this.state.show });
  };

  getSelectedImage = (url) => {
    this.setState({ image: url });
    console.log('image', url);
  };

  getSelectedTitle = (title) => {
    this.setState({ title });
    console.log('title', title);
  };

  getSelectedDescription = (description) => {
    this.setState({ description });
    console.log('description', description);
  };

  getSelectedStartTime = (startTime) => {
    this.setState({ startTime });
    console.log('startTime', startTime);
  };

  getSelectedCloseTime = (closeTime) => {
    this.setState({ closeTime });
    console.log('closeTime', closeTime);
  };

  getSelectedTask = (tasks) => {
    this.setState({ tasks });
    console.log('tasks', tasks);
  };

  getSelectedReward = (reward) => {
    this.setState({ reward });
    console.log('reward', reward);
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.onClick}>
          Create a Promotion
        </Button>

        {this.state.show ? (
          <div>
            <div className="before-task-wrapper">
              <div className="before-task-left">
                <UploadImage onSelectImage={this.getSelectedImage} />
              </div>

              <div className="before-task-right">
                <TitleInput onSelectTitle={this.getSelectedTitle} />
                <DescriptionInput onSelectDescription={this.getSelectedDescription} />
                <DateInput
                  onSelectStartTime={this.getSelectedStartTime}
                  onSelectCloseTime={this.getSelectedCloseTime}
                />
                <CreateSubtask onSelectTask={this.getSelectedTask} />
                <SelectReward onSelectReward={this.getSelectedReward} />
              </div>
            </div>
            <div>
              <Button variant="contained" color="secondary">
                submit
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CreatePromotion;
