import React from "react";
// import axios from "axios";
import Button from "@material-ui/core/Button";

export default function Progress(props) {
  const [participated, setParticipated] = useState(false);
  const jwtToken = localStorage.getItem("Authorization-Token");

  /** if found progress in database
   *  setParticipated(true);
   */

  let subtasks;
  if (props.content && !participated)
    subtasks = props.content.map((subtask) => <div>{subtask}</div>);

  return (
    <div onLoad={getProgress(props.id, jwtToken)}>
      <div>Current Progress:</div>
      {subtasks}
      <br></br>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          disabled={participated}
          onClick={() => {
            postProgress(props.id, jwtToken);
            setParticipated(true);
          }}
        >
          Participate
        </Button>
      </div>
    </div>
  );
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
  var progress;
  await axios({
    method: "GET",
    url: "/promotions/" + id + "/progress",
    headers: {
      Authorization: "Bearer " + jwtToken,
    },
  })
    .then((response) => {
      progress = response.status;
    })
    .catch((error) => {
      progress = -1;
    });
  return progress;
};

// const verifyTask = async (promotion_id, subtask_index) => {
//   await axios({
//     method: "POST",
//     url: "requests",
//     data: {
//       type: "subtask",
//       promotion_id: promotion_id,
//       subtask_index: subtask_index,
//     },
//   });
// };
