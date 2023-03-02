import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

export default class TaskList extends Component {

  static defaultProps = {

  };

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onEditSubmit: PropTypes.func.isRequired,
  };

  render() {

    const { todos, onDeleted, onToggleDone, onToggleEdit, onEditItem, onEditSubmit } = this.props;

    const elements = todos.map(item => {
      const { id, done, edit, ...itemProps } = item;

      let classNames = ''
      if (done) {
        classNames += 'completed'
      }
      if (edit) {
        classNames = 'editing'
      }

      return (
        <li className={classNames}
          key={id}
          onClick={(ev) => onToggleDone(ev, id)}
        >
          <Task
            {...itemProps}
            done={done}
            edit={edit}
            id={id}
            onDeleted={() => { onDeleted(id) }}
            onToggleEdit={() => { onToggleEdit(id) }}
            onEditItem={onEditItem}
            onEditSubmit={onEditSubmit}
          />
        </li>
      );
    });

    return (
      <ul className="todo-list">
        {elements}
      </ul>
    );
  };
}