import React from 'react';

export default function Progress(props){
    let subtasks;
    if (props.content) subtasks = props.content.map((subtask)=><div>{subtask}</div>);
    return (
        <>
            <p>Current Progress:</p>
            {subtasks}
        </>
    );
}