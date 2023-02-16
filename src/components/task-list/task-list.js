import React from 'react';

import Task from '../task/task';

const TaskList = ({ todos }) => {

  const elements = todos.map(item => {
    const { id, status, ...itemProps } = item;

    return (
      <li className={status} key={id}>
        <Task {...itemProps} />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

export default TaskList;