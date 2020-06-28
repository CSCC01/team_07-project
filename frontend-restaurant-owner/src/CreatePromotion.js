import React, { Component } from 'react';
import UploadImage from './components/UploadImage';
import TitleInput from './components/TitleInput';
import DescriptionInput from './components/DescriptionInput';
import CreateSubtask from './components/CreateSubtask';
import DateInput from './components/DateInput';
import SelectReward from './components/SelectReward';
import EditImagePopUp from './components/EditImagePopUp';

import Button from '@material-ui/core/Button';

import './CreatePromotion.css';

class CreatePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBtn: '',
      deleteAllTasks: '',
      image: '',
      sourceImage: '',
      title: '',
      description: '',
      startTime: '',
      closeTime: '',
      tasks: [],
      reward: -1,
      show: 0,
    };
  }

  createPromotion = () => {
    this.setState({ show: !this.state.show });
  };

  onUpdate = (key, value) => {
    this.setState({ [key]: value });
    console.log(key, value);
  };

  onEdit = (key, value) => {
    this.setState({ [key]: value });
    this.refs.child.onEdit(value);
    console.log('1');
  };

  onDelete = () => {
    this.setState({ image: '', sourceImage: '' });
    this.refs.child.onEdit('');
  };

  discardPromotion = () => {
    // goback
  };

  submitPromotion = () => {
    if (this.state.image === '') {
      console.log('image empty');
    } else if (this.state.title === '') {
      console.log('title empty');
    } else if (this.state.description === '') {
      console.log('description empty');
    } else if (this.state.startTime === '') {
      console.log('startTime empty');
    } else if (this.state.closeTime === '') {
      console.log('closeTime empty');
    } else if (this.state.tasks === []) {
      console.log('are you sure you want do not want any subtask');
    } else if (this.state.reward === -1) {
      console.log('reward empty');
    }
  };

  render() {
    return (
      <div className="create-promotion-wrapper">
        <div className="input-wrapper">
          <div style={{ marginRight: 20 }}>
            <UploadImage
              ref="child"
              onSelectImage={(value) => this.onUpdate('sourceImage', value)}
            />

            {this.state.sourceImage ? (
              <div className="left-button-row">
                <EditImagePopUp
                  sourceImage={this.state.sourceImage}
                  onSelectImage={(value) => this.onEdit('image', value)}
                />
                <Button variant="contained" color="secondary" onClick={this.onDelete}>
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
            <CreateSubtask ref="c" onSelectTask={(value) => this.onUpdate('task', value)} />
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
