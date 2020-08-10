import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "./index.css";

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participated: false,
      jwtToken: localStorage.getItem("Authorization-Token"),
      progress: null,
    };
  }

  async componentDidMount() {
    this.setState({
      progress: await getProgress(this.props.id, this.state.jwtToken),
    }, () => {
      if (this.state.progress.subtasks) {
        this.setState({ participated: true });
      }
    });
    
  }

  render() {
    let subtasks;
    if (this.props.content && !this.state.participated)
      subtasks = this.props.content.map((subtask) => <div>{subtask}</div>);

    let subtaskValidate;
    if (this.state.participated && this.state.progress.subtasks) {
      subtaskValidate = this.state.progress.subtasks.map((subtask) => (
        <div className="item">
          <div>
            {subtask.description}
            {subtask.status === "ongoing" ? (
              <div style={{ color: "red" }}>ONGOING</div>
            ) : (
              <div style={{ color: "green" }}>COMPLETED</div>
            )}
          </div>

          <div>
            <Button
              style={{ justifyContent: "right" }}
              variant="outlined"
              color="primary"
              size="small"
              disabled={subtask.status === "ongoing" ? false : true}
              onClick={async () => {
                const id = await postTaskRequest(
                  this.props.id,
                  subtask.index,
                  this.state.jwtToken
                ); alert("Confirmation request sent! Your request ID is: #" + id);
              }}
            >
              {subtask.status === "ongoing" ? "validate" : "validated"}
            </Button>
          </div>
        </div>
      ));
    }

    return (
      <div onLoad={getProgress(this.props.id, this.state.jwtToken)}>
        <div>Current Progress:</div>
        {subtasks}
        <div className="container">{subtaskValidate}</div>
        <br></br>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.participated}
            onClick={async () => {
              await postProgress(this.props.id, this.state.jwtToken);
              this.setState({
                progress: await getProgress(this.props.id, this.state.jwtToken),
                participated: true
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
