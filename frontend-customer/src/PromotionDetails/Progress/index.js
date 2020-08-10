import React from "react";
// import axios from "axios";
import Button from "@material-ui/core/Button";

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participated: false,
      jwtToken: localStorage.getItem("Authorization-Token"),
      progress: -1,
    };
  }

  async componentDidMount() {
    this.setState({
      progress: await getProgress(this.props.id, this.state.jwtToken),
    });
    if (this.state.progress !== -1) {
      this.setState({ participated: true });
    }
  }

  render() {
    let subtasks;
    if (this.props.content && !this.state.participated)
      subtasks = this.props.content.map((subtask) => <div>{subtask}</div>);

    let subtaskValidate;
    if (this.state.participated) {
      subtaskValidate = this.state.progress.subtasks.map((subtask) => (
        <div>
          {subtask.description}
          {subtask.status === "ongoing" && (
            <Button
              color="primary"
              size="small"
              onClick={async () =>
                await postTaskRequest(
                  this.props.id,
                  subtask.index,
                  this.state.jwtToken
                )
              }
            >
              validate
            </Button>
          )}
          {subtask.status === "ongoing" && (
            <div style={{ color: "red" }}>ONGOING</div>
          )}
          {subtask.status === "completed" && (
            <div style={{ color: "green" }}>COMPLETED</div>
          )}
        </div>
      ));
    }

    return (
      <div onLoad={getProgress(this.props.id, this.state.jwtToken)}>
        <div>Current Progress:</div>
        {subtasks}
        {subtaskValidate}
        <br></br>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.participated}
            onClick={() => {
              postProgress(this.props.id, this.state.jwtToken);
              this.setState({ participated: true });
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
  await axios({
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
};
