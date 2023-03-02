import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

export default class TaskFilter extends Component {

  static defaultProps = {
    filter: 'all',
  };

  static propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  render() {

    const { filter, onFilterChange } = this.props;

    const buttonsOut = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : null;
      return (
        <li key={name}>
          <button type="button"
            className={clazz}
            onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return (
      <ul className="filters">
        {buttonsOut}
      </ul>
    );
  };
}