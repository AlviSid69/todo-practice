import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'

import './task-list.css'

function TaskList(props) {
  const { todos, onDeleted, onToggleDone, onToggleEdit, onEditItem, onEditSubmit } = props

  const elements = todos.map((item) => {
    const { id, done, edit, ...itemProps } = item

    let classNames = ''
    if (done) {
      classNames += 'completed'
    }
    if (edit) {
      classNames = 'editing'
    }

    return (
      <li className={classNames} key={id}>
        <div onClick={(ev) => onToggleDone(ev, id)} role="presentation">
          <Task
            {...itemProps}
            done={done}
            edit={edit}
            id={id}
            onDeleted={() => {
              onDeleted(id)
            }}
            onToggleEdit={() => {
              onToggleEdit(id)
            }}
            onEditItem={onEditItem}
            onEditSubmit={onEditSubmit}
          />
        </div>
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string,
      done: PropTypes.bool,
      edit: PropTypes.bool,
      id: PropTypes.number,
      date: PropTypes.instanceOf(Date),
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
}

export default TaskList
