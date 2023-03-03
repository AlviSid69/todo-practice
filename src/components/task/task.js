import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'

import './task.css'

function Task(props) {
  const { task, id, done, edit, date, onDeleted, onEditItem, onToggleEdit, onEditSubmit } = props

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} readOnly />

        <label htmlFor={id}>
          <span className="description">{task}</span>
          <span className="created">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>

        <button type="button" name="edit" aria-label="Edit" className="icon icon-edit" onClick={onToggleEdit} />
        <button type="button" name="remove" aria-label="Remove" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {edit && (
        <form onSubmit={(ev) => onEditSubmit(ev, id)}>
          <input type="text" className="edit" value={task} onChange={(ev) => onEditItem(ev, id)} />
        </form>
      )}
    </>
  )
}

Task.defaultProps = {
  done: false,
  edit: false,
}

Task.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  done: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
}

export default Task
