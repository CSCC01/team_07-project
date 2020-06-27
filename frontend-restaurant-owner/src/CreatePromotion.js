import React, { Component } from 'react';
import SubtaskBtns from './components/SubtaskBtns';
import PromotionTime from './components/PromotionTime';
import './CreatePromotion.css';
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CreatePromotion extends Component {
  state = {
    image: 0,
    title: '',
    description: '',
    reward: -1,
  }

  imageButtonClick = event => {
    document.getElementById('image-input').click();
  };
  
  imageInputChange = event => {
    let file = event.target.files[0];
    if (file != null){
      this.setState ({
        image: URL.createObjectURL(event.target.files[0])
      })
    }
  };

  title = (event) => {
    this.setState ({
      title: event.target.value
    })
  };

  descriptionChange = (event) => {
    this.setState ({
      description: event.target.value
    })
  };

  rewardChange = (event) => {
    this.setState ({
      reward: event.target.value
    })
  };

  render() {
    return (
      <div>
        <div className="before-task-wrapper">

          <div className="before-task-left">
            <div className="title-popup-wrapper">
              <p className="title">Image</p>
              <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div className="image-popup-button">
                  <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                    <FontAwesomeIcon icon={faQuestion}/>
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                  >
                    <Box p={2}>
                      <Typography>User can only upload one image.</Typography>
                      <Typography>Hover to reupload.</Typography>
                    </Box>
                  </Popover>
                </div>
              )}
              </PopupState>
            </div>

            <div className="image-button-wrapper">
              <div className={this.state.image ? "upload-image" : "upload-image-init"}>
                <Button variant="contained" 
                        color="secondary" 
                        startIcon={<FontAwesomeIcon icon={faPlus}/>} 
                        className="image-upload-button"
                        onClick={this.imageButtonClick}>Upload</Button>
                <input type="file" style={{display:'none'}} id="image-input" onChange={this.imageInputChange}/>
              </div>
              {this.state.image ? <img className="image" src={this.state.image}></img> : <div className="image"></div>}
            </div>
          </div>

          <div className="before-task-right">
            <div className="title-popup-wrapper">
              <p className="title">Title</p>
              <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div className="image-popup-button">
                  <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                    <FontAwesomeIcon icon={faQuestion}/>
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                  >
                    <Box p={2}>
                      <Typography>No character limitation right now.</Typography>
                    </Box>
                  </Popover>
                </div>
              )}
              </PopupState>
            </div>

            <TextField variant="outlined" fullWidth onChange={this.titleChange} />

            <div className="title-popup-wrapper margin-top">
              <p className="title">Description</p>
              <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div className="image-popup-button">
                  <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                    <FontAwesomeIcon icon={faQuestion}/>
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                  >
                    <Box p={2}>
                      <Typography>No character and row limitation right now.</Typography>
                    </Box>
                  </Popover>
                </div>
              )}
              </PopupState>
            </div>

            <TextField variant="outlined" fullWidth multiline rows={4} onChange={this.descriptionChange}/>
            
            <div className="title-popup-wrapper margin-top">
              <p className="title">Reward</p>
              <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div className="image-popup-button">
                  <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                    <FontAwesomeIcon icon={faQuestion}/>
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'center',
                      horizontal: 'left',
                    }}
                  >
                    <Box p={2}>
                      <Typography>Coupon and points are unavaliable right now.</Typography>
                    </Box>
                  </Popover>
                </div>
              )}
              </PopupState>
            </div>
            
            <RadioGroup aria-label="gender" name="gender1" value={this.state.reward} onChange={this.rewardChange}>
              <FormControlLabel value="0" control={<Radio />} label="Coupon" />
              <FormControlLabel value="1" control={<Radio />} label="Point" />
            </RadioGroup>

          </div>

          
        </div>
  
        <div>
          <p>Subtasks</p>
          <SubtaskBtns />
          <PromotionTime />
        </div>
      </div>
    );
  }
}

export default CreatePromotion;
