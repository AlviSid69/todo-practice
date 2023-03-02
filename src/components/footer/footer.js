import React, { Component } from "react";
import PropTypes from 'prop-types';

import TaskFilter from "../tasks-filter/tasks-filter";

import './footer.css';

export default class Footer extends Component {

  static defaultProps = {
    count: 0,
    filter: 'all',
  };

  static propTypes = {
    count: PropTypes.number,
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    clearComplited: PropTypes.func.isRequired,
  };

  render() {

    const { count, filter, onFilterChange, clearComplited } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TaskFilter
          filter={filter}
          onFilterChange={onFilterChange}
        />
        <button className="clear-completed" onClick={clearComplited}>Clear completed</button>
      </footer>
    );
  };
};