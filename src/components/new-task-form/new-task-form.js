import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    task: '',
  }

  onTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { task } = this.state
    onItemAdded(task)
    this.setState({
      task: '',
    })
  }

  render() {
    const { task } = this.state
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onTaskChange}
            value={task}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
