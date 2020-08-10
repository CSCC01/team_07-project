import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./index.css";

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participated: false,
      jwtToken: localStorage.getItem("Authorization-Token"),
      progress: null,
      code: {}, // store the verification code for each subtask
    };
  }

  async componentDidMount() {
    this.setState(
      {
        progress: await getProgress(this.props.id, this.state.jwtToken),
      },
      () => {
        if (this.state.progress.subtasks) {
          this.setState({ participated: true });
        }
      }
    );
  }

  render() {
    // if user does not participated in this promotion
    let subtasks;
    if (this.props.content && !this.state.participated)
      subtasks = this.props.content.map((subtask, index) => 
      <div key={index} className="progress-content progress-margin-left">
        <FontAwesomeIcon icon={faCaretRight} style={{fontSize: '1.5rem', marginRight: 10}}/>
        <p style={{margin: 'auto', marginLeft: 0}}>{subtask}</p>
      </div>);

    // if user participates in this promotion
    let subtaskValidate;
    if (this.state.participated && this.state.progress.subtasks) {
      subtaskValidate = this.state.progress.subtasks.map((subtask) => (
        <>
        <div className="progress-content progress-margin-left">
          <FontAwesomeIcon icon={subtask.status === "ongoing" ? faSpinner : faCheck} style={{fontSize: '1.5rem', marginRight: 10}}/>
          <p style={{margin: 'auto', marginLeft: 0}}>{subtask.description}</p>
        </div>
        <div style={{ marginLeft: 30, textAlign: 'end' }}>
          {this.state.code[subtask.index] !== undefined && 
          <p style={{marginBottom: 10, marginTop: 10}}>
            Verification Code: #{this.state.code[subtask.index]}
          </p>
          }
          <Button
              style={subtask.status === "ongoing"
                ? { border: '#000 2px solid', backgroundColor: '#FFD564'}
                : { border: '#9e9e9e 2px solid' } }
              variant="outlined"
              color="default"
              size="small"
              disabled={subtask.status === "ongoing" ? false : true}
              onClick={async () => {
                const id = await postTaskRequest(
                  this.props.id,
                  subtask.index,
                  this.state.jwtToken
                ); alert("Confirmation request sent! Your request ID is: #" + id);
                let code = this.state.code;
                code[subtask.index] = id;
                this.setState({code});
              }}
            >
              {subtask.status === "ongoing" ? "validate" : "validated"}
          </Button>
        </div>
        </>
      ));
    }

    return (
      <div onLoad={getProgress(this.props.id, this.state.jwtToken)}>
        <div className="progress-title">Current Progress:</div>
        {subtasks}
        <div className="container">{subtaskValidate}</div>
        <br></br>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            color="default"
            style={this.state.participated
              ? { border: '#9e9e9e 2px solid', marginBottom: 20 }
              :{ border: '#000 2px solid', backgroundColor: '#FFD564', marginBottom: 20} }
            disabled={this.state.participated}
            onClick={async () => {
              await postProgress(this.props.id, this.state.jwtToken);
              this.setState({
                progress: await getProgress(this.props.id, this.state.jwtToken),
                participated: true,
              });
            }}
          >
            {this.state.participated ? "Participated" : "Participate"}
          </Button>
        </div>
      </div>
    );
  }
}

const postProgress = async (id, jwtToken) => {
  await axios({
    method: "POST",
    url: "/promotions/" + id + "/participate",
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  });
};

const getProgress = async (id, jwtToken) => {
  let progress;
  await axios({
    method: "GET",
    url: "/promotions/" + id + "/progress",
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  })
    .then((response) => {
      progress = response.data;
    })
    .catch(() => {
      progress = -1;
    });
  return progress;
};

const postTaskRequest = async (promotion_id, subtask_index, jwtToken) => {
  let response = await axios({
    method: "POST",
    url: "requests",
    data: {
      type: "subtask",
      promotion_id: promotion_id,
      subtask_index: subtask_index,
    },
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  });
  return generateRandomNumber(response.data.id);
};

// This function generates a random number to be the verification code
const generateRandomNumber = (id) => {
  let randomNumber = 3 ** 15 * id;
  let lastFourDigit = randomNumber % 10000;
  return lastFourDigit;
};
