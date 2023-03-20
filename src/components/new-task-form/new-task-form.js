import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    task: '',
    min: '',
    sec: '',
  }

  onTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
      const { onItemAdded } = this.props
      const { task, min, sec } = this.state
      onItemAdded(task, min, sec)
      this.setState({
        task: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { task, min, sec } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <form className="new-todo-form" onKeyDown={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onTaskChange}
            value={task}
          />
          <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={this.onMinutesChange} />
          <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={this.onSecondsChange} />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
