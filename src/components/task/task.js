import React from "react";

const Task = ({ task }) => {
  return (
    <>
      <div className="view">

        <input className="toggle" type="checkbox" />

        <label>
          <span className="description">{task}</span>
          <span className="created">created RANDOM seconds ago</span>
        </label>

        <button className="icon icon-edit" />
        <button className="icon icon-destroy" />

      </div>

      <input type="text" className="edit" value="Editing task" readOnly />
    </>
  );
};

export default Task;