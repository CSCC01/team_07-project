import React from "react";
// import axios from "axios";
import Button from "@material-ui/core/Button";

export default function Progress(props) {
  let subtasks;
  if (props.content)
    subtasks = props.content.map((subtask) => <div>{subtask}</div>);

  return (
    <div>
      <div>Current Progress:</div>
      {subtasks}
      <br></br>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          // onClick={postProgress(props.id)}
        >
          Participate
        </Button>
      </div>
    </div>
  );
}

// const postProgress = async (id) => {
//   await axios.post("/promotions/" + id + "/participate");
// };
