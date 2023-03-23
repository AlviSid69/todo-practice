import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
/* eslint-disable */
import './task.css'

const Task = ({ task, id, done, edit, date, min, sec, onDeleted, onEditItem, onToggleEdit, onEditSubmit }) => {

  const [[mins, secs], setTime] = useState([min, sec])
  const [over, setOver] = useState(false)
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    const timerID = setInterval(() => changeTimer(), 1000)
    return () => clearInterval(timerID)
  }, [changeTimer])

  function changeTimer() {
    if (!timer || over) {
      return
    }
    if (mins === 0 && secs === 0) {
      setOver(true)
    } else if (secs === 0) {
      setTime([mins - 1, 59])
    } else {
      setTime([mins, secs - 1])
    }
  }

  const playTimer = () => {
    setTimer(true)
  }

  const pauseTimer = () => {
    setTimer(false)
  }

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} readOnly />

        <label htmlFor={id}>
          <span className="title">{task}</span>
          <span className="description">
            <button type="button" name="timer" className="icon icon-play" onClick={playTimer} />
            <button type="button" name="timer" className="icon icon-pause" onClick={pauseTimer} />
            <span className="timer">
              {mins}:{secs}
            </span>
          </span>
          <span className="description">
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

export default Task

Task.defaultProps = {
  done: false,
  edit: false,
}

Task.propTypes = {
  task: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  done: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
}
