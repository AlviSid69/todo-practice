import React, { Component } from "react";
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {

  state = {
    task: '',
  };

  static propTypes = {
    onItemAdded: PropTypes.func.isRequired,
  };

  onTaskChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.task);
    this.setState({
      task: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>

          <input type='text'
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onTaskChange}
            value={this.state.task}
            autoFocus />

        </form>
      </header>
    );
  };
};