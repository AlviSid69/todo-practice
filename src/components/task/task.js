import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'

import './task.css'

/* eslint-disable */
export default class Task extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
    timer: false,
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.changeTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  changeTimer = () => {
    if (!this.state.timer) {
      return
    }

    let { min, sec } = this.state
    if (sec <= 0) {
      if (min === 0) {
        return
      }
      min--
      sec = 59
    } else {
      sec--
    }
    this.setState({ min, sec })
  }

  playTimer = () => {
    this.setState({ timer: true })
  }

  pauseTimer = () => {
    this.setState({ timer: false })
  }

  render() {
    const { task, id, done, edit, date, onDeleted, onEditItem, onToggleEdit, onEditSubmit } = this.props
    const { min, sec } = this.state

    return (
      <>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} readOnly />

          <label htmlFor={id}>
            <span className="title">{task}</span>
            <span className="description">
              <button name="timer" className="icon icon-play" onClick={this.playTimer}></button>
              <button name="timer" className="icon icon-pause" onClick={this.pauseTimer}></button>
              <span className="timer">
                {min}:{sec}
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
